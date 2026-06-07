import prisma from "../../../lib/prisma";

export const getExamBuilderQuestionsService = async (
  subjectId: number,
  difficulty: string,
) => {
  const questions = await prisma.question.findMany({
    where: {
      subjectId,
      difficulty: difficulty as any,
      isArchived: false,
    },

    include: {
      topic: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(
    "Exam Builder Question Sample:",
    JSON.stringify(questions[0], null, 2),
  );

  return questions;
};
