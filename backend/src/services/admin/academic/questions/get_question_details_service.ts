import prisma from "../../../../lib/prisma";

export const getQuestionDetailsService = async (questionId: number) => {
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },

    include: {
      options: true,

      examQuestions: true,

      studentAnswers: {
        include: {
          selectedOption: true,
        },
      },
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const attempts = question.studentAnswers.length;

  const correct = question.studentAnswers.filter(
    (answer) => answer.isCorrect,
  ).length;

  const incorrect = attempts - correct;

  const successRate =
    attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

  const assessmentsUsed = question.examQuestions.length;

  const averageTime =
    attempts === 0
      ? "0 sec"
      : `${Math.round(
          question.studentAnswers.reduce(
            (sum, answer) => sum + (answer.timeSpentSeconds ?? 0),
            0,
          ) / attempts,
        )} sec`;

  const answerDistribution = question.options.map((option, index) => ({
    choice: String.fromCharCode(65 + index),

    answer: option.optionText,

    count: question.studentAnswers.filter(
      (answer) => answer.selectedOptionId === option.id,
    ).length,

    correct: option.isCorrect,
  }));

  return {
    id: question.id,

    question: question.question,

    topic: question.topicId,

    difficulty: question.difficulty,

    successRate,

    attempts,

    assessmentsUsed,

    averageTime,

    correct,

    incorrect,

    blockedStudents: {
      easy: 0,
      medium: 0,
      hard: 0,
      expert: 0,
    },

    answerDistribution,
  };
};
