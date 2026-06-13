import prisma from "../../../lib/prisma";

export async function getAdminExamMonitoringDetailsService(examId: number) {
  // Get exam without faculty restriction (admin can see all exams)
  const exam = await prisma.exam.findFirst({
    where: {
      id: examId,
    },
    include: {
      subject: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
      section: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          examQuestions: true,
        },
      },
      attempts: {
        select: {
          id: true,
          studentId: true,
          status: true,
          startedAt: true,
          submittedAt: true,
          score: true,
          student: {
            select: {
              id: true,
              name: true,
              studentId: true,
            },
          },
          responses: {
            orderBy: { answeredAt: "desc" },
            take: 1,
            select: { answeredAt: true },
          },
        },
      },
      violations: {
        where: {
          timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        select: {
          id: true,
          examId: true,
          studentId: true,
          type: true,
          severity: true,
          timestamp: true,
          description: true,
          details: true,
          resolved: true,
          resolvedAt: true,
          resolvedBy: true,
          student: { select: { name: true } },
        },
        orderBy: { timestamp: "desc" },
      },
    },
  });

  if (!exam) {
    throw new Error("Exam not found");
  }

  // Calculate statistics
  const activeAttempts = exam.attempts.filter(
    (a) => a.status === "IN_PROGRESS",
  );
  const completedAttempts = exam.attempts.filter((a) =>
    ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(a.status),
  );
  const flaggedAttempts = exam.attempts.filter((a) => a.status === "FLAGGED");
  const totalStudents = exam.attempts.length;
  const progressPercentage =
    totalStudents > 0
      ? Math.round((completedAttempts.length / totalStudents) * 100)
      : 0;

  // Calculate risk level
  const violationCount = exam.violations.length;
  let riskLevel: "LOW" | "MEDIUM" | "HIGH" =
    violationCount >= 10 ? "HIGH" : violationCount >= 3 ? "MEDIUM" : "LOW";
  if (flaggedAttempts.length > totalStudents * 0.3) riskLevel = "HIGH";

  // Get time remaining
  const now = new Date();
  const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
  const timeRemainingMinutes =
    endsAt && now < endsAt
      ? Math.max(
          0,
          Math.round((endsAt.getTime() - now.getTime()) / (60 * 1000)),
        )
      : 0;

  // Get last activity
  const lastActivityAt =
    activeAttempts.length > 0
      ? new Date(
          Math.max(...activeAttempts.map((a) => a.startedAt?.getTime() || 0)),
        ).toISOString()
      : exam.updatedAt.toISOString();

  // Build student monitoring data
  const studentData = exam.attempts.map((attempt) => {
    const studentViolations = exam.violations.filter(
      (v) => v.studentId === attempt.studentId,
    ).length;
    const studentRiskLevel: "LOW" | "MEDIUM" | "HIGH" =
      studentViolations >= 5
        ? "HIGH"
        : studentViolations >= 2
          ? "MEDIUM"
          : "LOW";

    let status: "ACTIVE" | "COMPLETED" | "FLAGGED" =
      attempt.status === "IN_PROGRESS"
        ? "ACTIVE"
        : attempt.status === "FLAGGED"
          ? "FLAGGED"
          : "COMPLETED";

    return {
      id: attempt.studentId,
      name: attempt.student.name,
      studentNumber: attempt.student.studentId,
      status,
      startTime: attempt.startedAt?.toISOString(),
      submissionTime:
        attempt.submittedAt?.toISOString() ||
        attempt.responses[0]?.answeredAt?.toISOString(),
      riskLevel: studentRiskLevel,
      score: attempt.score,
      violationCount: studentViolations,
    };
  });

  // Sort by risk level
  studentData.sort((a, b) => {
    const riskOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
  });

  // Build activity feed from violations
  const activityFeed = exam.violations.slice(0, 50).map((v) => ({
    id: v.id,
    timestamp: v.timestamp.toISOString(),
    studentName: v.student.name,
    action: getViolationActionText(v.type),
    severity:
      v.severity.toLowerCase() === "high"
        ? "ERROR"
        : v.severity.toLowerCase() === "medium"
          ? "WARNING"
          : "INFO",
    isViolation: true,
    type: v.type,
  }));

  return {
    exam: {
      id: exam.id,
      title: exam.title,
      status: exam.status,
      subjectId: exam.subject.id,
      subjectName: exam.subject.name,
      subjectCode: exam.subject.code,
      sectionId: exam.section.id,
      sectionName: exam.section.name,
      totalQuestions: exam._count.examQuestions,
      duration: exam.duration,
      startsAt: exam.startsAt?.toISOString() || null,
      endsAt: exam.endsAt?.toISOString() || null,
      createdAt: exam.createdAt.toISOString(),
    },
    statistics: {
      totalStudents,
      activeStudents: activeAttempts.length,
      completedStudents: completedAttempts.length,
      flaggedStudents: flaggedAttempts.length,
      progressPercentage,
      riskLevel,
      timeRemainingMinutes,
      violationCount,
    },
    studentMonitoring: studentData,
    activityFeed,
    lastUpdated: new Date().toISOString(),
  };
}

function getViolationActionText(violationType: string): string {
  const violationMap: Record<string, string> = {
    TAB_SWITCH: "switched tabs",
    WINDOW_BLUR: "window blur detected",
    DEVICE_CHANGE: "device change detected",
    MULTIPLE_FACES: "multiple faces detected",
    NO_FACE: "no face detected",
    SUSPICIOUS_ACTIVITY: "suspicious activity detected",
  };
  return violationMap[violationType] || "violation detected";
}
