import prisma from "../../../../lib/prisma";

export const getSectionQuestionBankStatsService = async (sectionId: number) => {
  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },

    include: {
      sectionSubjects: {
        include: {
          subject: {
            include: {
              questions: {
                include: {
                  topic: true,

                  studentAnswers: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!section) {
    throw new Error("Section not found");
  }

  const questions = section.sectionSubjects.flatMap(
    (assignment) => assignment.subject.questions,
  );

  const totalQuestions = questions.length;

  const totalTopics = new Set(questions.map((question) => question.topic.name))
    .size;

  let weakQuestions = 0;

  const successRates = questions.map((question) => {
    const attempts = question.studentAnswers.length;

    const correctAnswers = question.studentAnswers.filter(
      (answer) => answer.isCorrect,
    ).length;

    const successRate =
      attempts === 0 ? 0 : Math.round((correctAnswers / attempts) * 100);

    if (attempts > 0 && successRate < 50) {
      weakQuestions++;
    }

    return successRate;
  });

  const averageSuccessRate =
    successRates.length === 0
      ? 0
      : Math.round(
          successRates.reduce((sum, rate) => sum + rate, 0) /
            successRates.length,
        );

  return {
    totalQuestions,

    totalTopics,

    weakQuestions,

    averageSuccessRate,
  };
};
