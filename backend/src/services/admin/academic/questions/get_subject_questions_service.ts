import prisma from "../../../../lib/prisma";

export const getSubjectQuestionsService = async (subjectId: number) => {
  const questions = await prisma.question.findMany({
    where: {
      subjectId,
    },

    include: {
      studentAnswers: true,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  return questions.map((question) => {
    const attempts = question.studentAnswers.length;

    const correctAnswers = question.studentAnswers.filter(
      (answer) => answer.isCorrect,
    ).length;

    const successRate =
      attempts === 0 ? 0 : Math.round((correctAnswers / attempts) * 100);

    return {
      id: question.id,

      topic: question.topicId,

      difficulty: question.difficulty,

      successRate,

      attempts,
    };
  });
};
