import prisma from "../../../lib/prisma";
import { facultyNotificationHandler } from "../../notification/faculty_notification_handler";
import { studentNotificationHandler } from "../../notification/student_notification_handler";
import { adminNotificationHandler } from "../../notification/admin_notification_handler";
import { notificationService } from "../../notification/notification_service";
import { NotificationType } from "../../notification/notification_types";

async function getExamAuthCheck(examId: number, facultyId: number) {
  const exam = await prisma.exam.findFirst({
    where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
  });
  if (!exam) throw new Error("Exam not found or unauthorized");
  return exam;
}

export async function pauseExamService(examId: number, facultyId: number) {
  await getExamAuthCheck(examId, facultyId);
  await prisma.exam.update({ where: { id: examId }, data: { updatedAt: new Date() } });
  return { success: true, message: "Exam paused successfully" };
}

export async function endExamService(examId: number, facultyId: number, force: boolean = false) {
  const exam = await prisma.exam.findFirst({
    where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
    include: { attempts: { where: { status: "IN_PROGRESS" } } },
  });

  if (!exam) throw new Error("Exam not found or unauthorized");

  if (force) {
    await prisma.examAttempt.updateMany({
      where: { examId, status: "IN_PROGRESS" },
      data: { status: "AUTO_SUBMITTED", submittedAt: new Date() },
    });
  }

  await prisma.exam.update({
    where: { id: examId },
    data: { status: "COMPLETED", endsAt: new Date(), updatedAt: new Date() },
  });

  return { success: true, message: `Exam ${force ? "force-ended" : "ended"} successfully`, affectedStudents: exam.attempts.length };
}

export async function flagStudentService(examId: number, facultyId: number, studentId: number, reason?: string) {
  await getExamAuthCheck(examId, facultyId);

  const attempt = await prisma.examAttempt.findFirst({
    where: { examId, studentId, status: "IN_PROGRESS" },
  });

  if (!attempt) throw new Error("Student not found or not actively taking the exam");

  const [, violation] = await Promise.all([
    prisma.examAttempt.update({ where: { id: attempt.id }, data: { status: "FLAGGED" } }),
    prisma.examViolation.create({
      data: {
        examId,
        studentId,
        type: "SUSPICIOUS_ACTIVITY",
        severity: "HIGH",
        description: reason || "Manually flagged by faculty",
        details: `Student flagged by faculty member ID: ${facultyId}`,
        resolved: false,
        timestamp: new Date(),
      },
    }),
  ]);

  void facultyNotificationHandler
    .notifyViolationDetected(violation.id)
    .catch((error) => {
      console.error("Failed to send faculty violation notification:", error);
    });

  void studentNotificationHandler
    .notifyExamFlagged(violation.id)
    .catch((error) => {
      console.error("Failed to send student violation notification:", error);
    });

  void adminNotificationHandler
    .notifyExamViolationEscalation(
      examId,
      studentId,
      1,
      reason || "Manual faculty flag",
    )
    .catch((error) => {
      console.error("Failed to send admin violation notification:", error);
    });

  return { success: true, message: "Student flagged successfully" };
}

export async function unlockStudentService(examId: number, facultyId: number, studentId: number) {
  await getExamAuthCheck(examId, facultyId);

  const attempt = await prisma.examAttempt.findFirst({
    where: { examId, studentId, status: "FLAGGED" },
  });

  if (!attempt) throw new Error("Student not found or not flagged");

  await Promise.all([
    prisma.examAttempt.update({ where: { id: attempt.id }, data: { status: "IN_PROGRESS" } }),
    prisma.examViolation.updateMany({
      where: { examId, studentId, type: "SUSPICIOUS_ACTIVITY", resolved: false },
      data: { resolved: true, resolvedAt: new Date(), resolvedBy: `Faculty ${facultyId}` },
    }),
  ]);

  return { success: true, message: "Student unlocked successfully" };
}

export async function notifyStudentService(examId: number, facultyId: number, studentId: number, message: string) {
  const exam = await getExamAuthCheck(examId, facultyId);

  const attempt = await prisma.examAttempt.findFirst({ where: { examId, studentId } });
  if (!attempt) throw new Error("Student not found in this exam");

  const notification = await notificationService.createNotification(studentId, {
    type: NotificationType.EXAM_NOTIFICATION,
    title: `Message from ${exam.title} faculty`,
    message,
    metadata: { examId, facultyId, timestamp: new Date() },
    priority: "MEDIUM",
  });

  if (!notification) {
    return {
      success: true,
      message: "Student has notifications disabled; message was not delivered",
    };
  }

  return { success: true, message: "Notification sent successfully" };
}

export async function exportExamReportService(examId: number, facultyId: number) {
  const exam = await prisma.exam.findFirst({
    where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
    include: {
      subject: { select: { name: true, code: true } },
      section: { select: { name: true } },
      attempts: { include: { student: { select: { name: true, studentId: true } } } },
      violations: { where: { timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }, include: { student: { select: { name: true } } } },
      examQuestions: { select: { id: true } },
    },
  });

  if (!exam) throw new Error("Exam not found or unauthorized");

  return {
    exam: {
      id: exam.id,
      title: exam.title,
      subject: exam.subject.name,
      section: exam.section.name,
      status: exam.status,
      startsAt: exam.startsAt,
      endsAt: exam.endsAt,
      duration: exam.duration,
      totalQuestions: exam.examQuestions.length,
    },
    statistics: {
      totalStudents: exam.attempts.length,
      completedStudents: exam.attempts.filter((a) => ["COMPLETED", "SUBMITTED", "AUTO_SUBMITTED"].includes(a.status)).length,
      inProgressStudents: exam.attempts.filter((a) => a.status === "IN_PROGRESS").length,
      flaggedStudents: exam.attempts.filter((a) => a.status === "FLAGGED").length,
      averageScore: exam.attempts.length > 0 ? exam.attempts.reduce((sum, a) => sum + (a.score || 0), 0) / exam.attempts.length : 0,
      totalViolations: exam.violations.length,
      highSeverityViolations: exam.violations.filter((v) => v.severity === "HIGH").length,
      unresolvedViolations: exam.violations.filter((v) => !v.resolved).length,
    },
    violations: exam.violations.map((v) => ({
      studentName: v.student.name,
      type: v.type,
      severity: v.severity,
      timestamp: v.timestamp,
      description: v.description,
      resolved: v.resolved,
    })),
    students: exam.attempts.map((a) => ({
      name: a.student.name,
      studentNumber: a.student.studentId,
      status: a.status,
      score: a.score,
      startedAt: a.startedAt,
      submittedAt: a.submittedAt,
    })),
    rules: {
      violationThreshold: exam.violationThreshold,
      thresholdAction: exam.thresholdAction,
      securityFeatures: {
        detectTabSwitch: exam.detectTabSwitch,
        detectWindowBlur: exam.detectWindowBlur,
        detectDeviceChange: exam.detectDeviceChange,
      },
    },
    generatedAt: new Date().toISOString(),
    facultyId,
  };
}
