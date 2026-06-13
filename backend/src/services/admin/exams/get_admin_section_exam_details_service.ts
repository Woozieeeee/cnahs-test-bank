import prisma from "../../../lib/prisma";

export const getAdminSectionExamDetailsService = async (sectionId: number) => {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
      isArchived: false,
    },
    include: {
      users: {
        where: {
          role: "STUDENT",
        },
      },
      exams: {
        where: {
          isArchived: false,
        },
        include: {
          attempts: true,
          violations: true,
          subject: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!section) {
    throw new Error(`Section with ID ${sectionId} not found`);
  }

  // Calculate stats
  const totalStudents = section.users.length;

  const allExamViolations = section.exams.flatMap((e: any) => e.violations);

  const violationCounts = {
    total: allExamViolations.length,
    unresolved: allExamViolations.filter((v: any) => !v.resolved).length,
    resolved: allExamViolations.filter((v: any) => v.resolved).length,
    bySeverity: {
      LOW: allExamViolations.filter((v: any) => v.severity === "LOW").length,
      MEDIUM: allExamViolations.filter((v: any) => v.severity === "MEDIUM")
        .length,
      HIGH: allExamViolations.filter((v: any) => v.severity === "HIGH")
        .length,
    },
  };

  // Find ongoing exams
  const now = new Date();
  const ongoingExams = section.exams.filter((exam: any) => {
    const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
    const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;

    if (!startsAt || !endsAt) return false;
    return startsAt <= now && now <= endsAt;
  });

  const activeStudents = new Set(
    ongoingExams.flatMap((e: any) =>
      e.attempts
        .filter((a: any) => a.status === "IN_PROGRESS")
        .map((a: any) => a.studentId),
    ),
  ).size;

  return {
    id: section.id,
    name: section.name,
    code: section.sectionCode,
    program: section.program,
    yearLevel: section.yearLevel,
    totalStudents,
    activeStudents,
    exams: section.exams.map((exam: any) => ({
      id: exam.id,
      title: exam.title,
      code: exam.examCode,
      subject: exam.subject.name,
      status: exam.status,
      difficulty: exam.difficulty,
      startsAt: exam.startsAt,
      endsAt: exam.endsAt,
      totalQuestions: exam.totalQuestions,
      totalAttempts: exam.attempts.length,
      totalViolations: exam.violations.length,
      unresolvedViolations: exam.violations.filter((v: any) => !v.resolved)
        .length,
    })),
    violations: violationCounts,
  };
};
