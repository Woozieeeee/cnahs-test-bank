import prisma from "../../../lib/prisma";

export const getSubjectQuestionBankService = async (
  facultyId: number,
  subjectId: number,
) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,

      faculties: {
        some: {
          facultyId,
        },
      },
    },

    include: {
      topics: {
        select: {
          id: true,
          name: true,
          totalQuestions: true,
        },
      },

      questions: {
        include: {
          topic: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!subject) {
    throw new Error("Subject not found.");
  }

  const totalQuestions = subject.questions.length;

  const totalTopics = subject.topics.length;

  const weakQuestions = subject.questions
    .filter((question) => {
      if (question.totalAttempts === 0) {
        return false;
      }

      const successRate =
        (question.totalCorrect / question.totalAttempts) * 100;

      return successRate < 50;
    })
    .map((question) => ({
      id: question.id,

      question: question.question,

      difficulty: question.difficulty,

      totalAttempts: question.totalAttempts,

      totalCorrect: question.totalCorrect,

      successRate: Math.round(
        (question.totalCorrect / question.totalAttempts) * 100,
      ),
    }))
    .sort((a, b) => a.successRate - b.successRate);

  const strongQuestions = subject.questions
    .filter((question) => {
      if (question.totalAttempts === 0) {
        return false;
      }

      const successRate =
        (question.totalCorrect / question.totalAttempts) * 100;

      return successRate >= 80;
    })
    .map((question) => ({
      id: question.id,

      question: question.question,

      difficulty: question.difficulty,

      totalAttempts: question.totalAttempts,

      totalCorrect: question.totalCorrect,

      successRate: Math.round(
        (question.totalCorrect / question.totalAttempts) * 100,
      ),
    }))
    .sort((a, b) => b.successRate - a.successRate);

  const weakQuestionCount = weakQuestions.length;

  const averageSuccessRate =
    totalQuestions === 0
      ? 0
      : Math.round(
          subject.questions.reduce((total, question) => {
            if (question.totalAttempts === 0) {
              return total;
            }

            return (
              total + (question.totalCorrect / question.totalAttempts) * 100
            );
          }, 0) / totalQuestions,
        );

  const difficultyDistribution = {
    EASY: subject.questions.filter((question) => question.difficulty === "EASY")
      .length,

    MEDIUM: subject.questions.filter(
      (question) => question.difficulty === "MEDIUM",
    ).length,

    HARD: subject.questions.filter((question) => question.difficulty === "HARD")
      .length,

    EXPERT: subject.questions.filter(
      (question) => question.difficulty === "EXPERT",
    ).length,
  };

  return {
    subject: {
      id: subject.id,
      name: subject.name,
      code: subject.code,
    },

    totalQuestions,

    totalTopics,

    weakQuestionCount,

    weakQuestions,

    strongQuestions,

    averageSuccessRate,

    difficultyDistribution,

    topics: subject.topics,

    questions: subject.questions,
  };
};
