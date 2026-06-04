import prisma from "../lib/prisma";

export const getTopicDependencies = async (topicId: number) => {
  const questionCount = await prisma.question.count({
    where: {
      topicId,
    },
  });

  const exams = await prisma.exam.findMany({
    where: {
      examQuestions: {
        some: {
          question: {
            topicId,
          },
        },
      },

      isArchived: false,
    },

    select: {
      id: true,

      title: true,

      section: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    questionCount,

    exams,
  };
};
