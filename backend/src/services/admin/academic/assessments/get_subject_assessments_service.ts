import prisma from "../../../../lib/prisma";

export const getSubjectAssessmentsService = async (subjectId: number) => {
  const exams = await prisma.exam.findMany({
    where: {
      subjectId,
    },

    include: {
      attempts: true,

      section: true,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  return exams.map((exam) => {
    const students = exam.attempts.length;

    const averageScore =
      students === 0
        ? 0
        : Math.round(
            exam.attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
              students,
          );

    return {
      id: exam.id,

      title: exam.title,

      difficulty: exam.difficulty,

      status: exam.status,

      sections: 1,

      students,

      averageScore,
    };
  });
};
