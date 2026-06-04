import prisma from "../../../lib/prisma";

interface UpdateQuestionData {
  facultyId: number;

  questionId: number;

  question: string;

  explanation?: string;

  difficulty: string;

  correctAnswer: string;

  options: string[];
}

export const updateQuestionService = async ({
  facultyId,
  questionId,
  question,
  explanation,
  difficulty,
  correctAnswer,
  options,
}: UpdateQuestionData) => {
  const existingQuestion = await prisma.question.findFirst({
    where: {
      id: questionId,

      subject: {
        faculties: {
          some: {
            facultyId,
          },
        },
      },
    },

    include: {
      options: true,
    },
  });

  if (!existingQuestion) {
    throw new Error("Question not found");
  }

  const cleanOptions = options.map((option) => option.trim()).filter(Boolean);

  if (cleanOptions.length < 4) {
    throw new Error("All four options are required");
  }

  if (!cleanOptions.includes(correctAnswer)) {
    throw new Error("Correct answer must match one of the options");
  }

  await prisma.questionOption.deleteMany({
    where: {
      questionId,
    },
  });

  const updatedQuestion = await prisma.question.update({
    where: {
      id: questionId,
    },

    data: {
      question,

      explanation,

      difficulty: difficulty as any,

      correctAnswer,

      options: {
        create: cleanOptions.map((option) => ({
          optionText: option,

          isCorrect: option === correctAnswer,
        })),
      },
    },

    include: {
      topic: true,

      options: true,
    },
  });

  return updatedQuestion;
};
