import prisma from "../../../lib/prisma";

export const restoreQuestionService = async (
  facultyId: number,
  questionId: number,
) => {
  const question = await prisma.question.findFirst({
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
  });

  if (!question) {
    throw new Error("Question not found");
  }

  return prisma.question.update({
    where: {
      id: questionId,
    },

    data: {
      isArchived: false,
    },
  });
};
