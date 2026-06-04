import prisma from "../../../../lib/prisma";

export const getSubjectAssessmentSummaryService = async (subjectId: number) => {
  const exams = await prisma.exam.findMany({
    where: {
      subjectId,
    },

    include: {
      attempts: {
        select: {
          score: true,
        },
      },
    },
  });

  const totalAssessments = exams.length;

  const completedAssessments = exams.filter(
    (exam) => exam.status === "COMPLETED",
  ).length;

  const activeAssessments = exams.filter(
    (exam) => exam.status === "ONGOING" || exam.status === "SCHEDULED",
  ).length;

  const scores = exams.flatMap((exam) =>
    exam.attempts.map((attempt) => attempt.score),
  );

  const averageScore =
    scores.length === 0
      ? 0
      : Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        );

  return {
    totalAssessments,

    averageScore,

    completedAssessments,

    activeAssessments,
  };
};
