import prisma from "../../../lib/prisma";

export const restoreTopicService = async (
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

  const restoredTopic = await prisma.topic.update({
    where: {
      id: topicId,
    },

    data: {
      isArchived: false,
    },
    include: {
      questions: true,
    },
  });

  return {
    id: restoredTopic.id,
    name: restoredTopic.name,
    description: restoredTopic.description,
    totalQuestions: restoredTopic.questions.length,
    isArchived: restoredTopic.isArchived,
  };
};
