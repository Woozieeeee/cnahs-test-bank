import prisma from "../../../lib/prisma";

export async function getExamActiveStudentsService(examId: number, facultyId: number) {
  const exam = await prisma.exam.findFirst({
    where: { id: examId, OR: [{ createdById: facultyId }, { facultyId }] },
  });

  if (!exam) throw new Error("Exam not found or unauthorized");

  const [attempts, questionCount, violations] = await Promise.all([
    prisma.examAttempt.findMany({
      where: { examId },
      include: { student: { select: { id: true, name: true, studentId: true } }, responses: { orderBy: { answeredAt: "desc" }, take: 1 } },
    }),
    prisma.examQuestion.count({ where: { examId } }),
    prisma.examViolation.groupBy({
      by: ["studentId"],
      where: { examId, timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      _count: { id: true },
    }),
  ]);

  const violationMap = Object.fromEntries(violations.map((v) => [v.studentId, v._count.id]));
  const now = new Date();

  return attempts
    .map((attempt) => {
      const violationCount = violationMap[attempt.studentId] || 0;
      const riskLevel: "LOW" | "MEDIUM" | "HIGH" = violationCount >= 5 ? "HIGH" : violationCount >= 2 ? "MEDIUM" : "LOW";
      const status: "IN_PROGRESS" | "COMPLETED" | "FLAGGED" | "VIOLATION_EXCEEDED" =
        attempt.status === "COMPLETED" || attempt.status === "SUBMITTED" || attempt.status === "AUTO_SUBMITTED"
          ? "COMPLETED"
          : attempt.status === "FLAGGED"
          ? "FLAGGED"
          : violationCount >= 10
          ? "VIOLATION_EXCEEDED"
          : "IN_PROGRESS";

      const startedAt = attempt.startedAt ? new Date(attempt.startedAt) : now;
      const timeSpent = Math.round((now.getTime() - startedAt.getTime()) / 1000);
      const lastActivityAt = attempt.responses[0]?.answeredAt?.toISOString() || (attempt.submittedAt ? attempt.submittedAt.toISOString() : startedAt.toISOString());

      return {
        studentId: attempt.studentId,
        studentName: attempt.student.name,
        status,
        currentQuestion: attempt.responses.length > 0 ? 1 : 0,
        totalQuestions: questionCount,
        timeSpent,
        violations: violationCount,
        riskLevel,
        lastActivityAt,
        studentEmail: attempt.student.id,
        studentNumber: attempt.student.studentId,
        startedAt: attempt.startedAt?.toISOString(),
        submittedAt: attempt.submittedAt?.toISOString(),
        score: attempt.score,
      };
    })
    .sort((a, b) => {
      const riskOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      const riskDiff = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      if (riskDiff !== 0) return riskDiff;
      if (a.violations !== b.violations) return b.violations - a.violations;
      const statusOrder = { VIOLATION_EXCEEDED: 0, FLAGGED: 1, IN_PROGRESS: 2, COMPLETED: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
}
