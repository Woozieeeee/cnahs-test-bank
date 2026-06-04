import prisma from "../../../lib/prisma";

export const getTopicQuestionsService = async (
  facultyId: number,
  topicId: number,
) => {
  const topic = await prisma.topic.findFirst({
    where: {
      id: topicId,

      subject: {
        faculties: {
          some: {
            facultyId,
          },
        },
      },
    },
  });

  if (!topic) {
    throw new Error("Topic not found");
  }

  const questions = await prisma.question.findMany({
    where: {
      topicId,
    },

    include: {
      options: {
        select: {
          id: true,

          optionText: true,

          isCorrect: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return questions;
};
