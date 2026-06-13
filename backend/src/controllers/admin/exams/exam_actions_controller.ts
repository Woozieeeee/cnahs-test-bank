import { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import { notificationService } from "../../../services/notification/notification_service";
import { NotificationType } from "../../../services/notification/notification_types";
import { facultyNotificationHandler } from "../../../services/notification/faculty_notification_handler";
import { studentNotificationHandler } from "../../../services/notification/student_notification_handler";
import { adminNotificationHandler } from "../../../services/notification/admin_notification_handler";

export const adminEndExamController = async (req: Request, res: Response) => {
  try {
    const examId = parseInt(req.params.examId as string);
    const { force } = req.body;

    const exam = await prisma.exam.findFirst({
      where: { id: examId },
      include: { attempts: { where: { status: "IN_PROGRESS" } } },
    });

    if (!exam) throw new Error("Exam not found");

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

    return res.status(200).json({
      success: true,
      message: `Exam ${force ? "force-ended" : "ended"} successfully`,
      affectedStudents: exam.attempts.length,
    });
  } catch (error) {
    console.error("Failed to end exam:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const adminFlagStudentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const examId = parseInt(req.params.examId as string);
    const { studentId, reason } = req.body;

    const attempt = await prisma.examAttempt.findFirst({
      where: { examId, studentId, status: "IN_PROGRESS" },
    });

    if (!attempt)
      throw new Error("Student not found or not actively taking the exam");

    const [, violation] = await Promise.all([
      prisma.examAttempt.update({
        where: { id: attempt.id },
        data: { status: "FLAGGED" },
      }),
      prisma.examViolation.create({
        data: {
          examId,
          studentId,
          type: "SUSPICIOUS_ACTIVITY",
          severity: "HIGH",
          description: reason || "Manually flagged by admin",
          details: `Student flagged by admin`,
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
        reason || "Manual admin flag",
      )
      .catch((error) => {
        console.error("Failed to send admin violation notification:", error);
      });

    return res
      .status(200)
      .json({ success: true, message: "Student flagged successfully" });
  } catch (error) {
    console.error("Failed to flag student:", error);
    const errorMessage = (error as Error).message;
    if (
      errorMessage.includes("not found") ||
      errorMessage.includes("not actively")
    ) {
      return res.status(404).json({ message: errorMessage });
    }
    return res.status(400).json({
      message: errorMessage,
    });
  }
};

export const adminUnlockStudentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const examId = parseInt(req.params.examId as string);
    const { studentId } = req.body;

    const attempt = await prisma.examAttempt.findFirst({
      where: { examId, studentId, status: "FLAGGED" },
    });

    if (!attempt) throw new Error("Student not found or not flagged");

    await Promise.all([
      prisma.examAttempt.update({
        where: { id: attempt.id },
        data: { status: "IN_PROGRESS" },
      }),
      prisma.examViolation.updateMany({
        where: {
          examId,
          studentId,
          type: "SUSPICIOUS_ACTIVITY",
          resolved: false,
        },
        data: { resolved: true, resolvedAt: new Date(), resolvedBy: `Admin` },
      }),
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Student unlocked successfully" });
  } catch (error) {
    console.error("Failed to unlock student:", error);
    const errorMessage = (error as Error).message;
    if (errorMessage.includes("not found")) {
      return res.status(404).json({ message: errorMessage });
    }
    return res.status(400).json({
      message: errorMessage,
    });
  }
};

export const adminNotifyStudentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const examId = parseInt(req.params.examId as string);
    const { studentId, message } = req.body;

    const exam = await prisma.exam.findFirst({
      where: { id: examId },
    });

    if (!exam) throw new Error("Exam not found");

    const attempt = await prisma.examAttempt.findFirst({
      where: { examId, studentId },
    });
    if (!attempt) throw new Error("Student not found in this exam");

    const notification = await notificationService.createNotification(
      studentId,
      {
        type: NotificationType.EXAM_NOTIFICATION,
        title: `Message from ${exam.title} admin`,
        message,
        metadata: { examId, timestamp: new Date() },
        priority: "MEDIUM",
      },
    );

    if (!notification) {
      return {
        success: true,
        message:
          "Student has notifications disabled; message was not delivered",
      };
    }

    return res
      .status(200)
      .json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error("Failed to notify student:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const adminSendAnnouncementController = async (
  req: Request,
  res: Response,
) => {
  try {
    const examId = parseInt(req.params.examId as string);
    const { message } = req.body;

    const exam = await prisma.exam.findFirst({
      where: {
        id: examId,
      },
      include: {
        attempts: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    const studentIds = exam.attempts.map((attempt) => attempt.studentId);
    const notifications = await notificationService.createBulkNotifications(
      studentIds,
      {
        type: NotificationType.EXAM_ANNOUNCEMENT,
        title: `Announcement from ${exam.title}`,
        message,
        metadata: {
          examId,
          timestamp: new Date(),
        },
        priority: "MEDIUM",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Announcement sent successfully",
      sentTo: notifications.length,
    });
  } catch (error) {
    console.error("Failed to send announcement:", error);
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
