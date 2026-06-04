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

  return prisma.topic.update({
    where: {
      id: topicId,
    },

    data: {
      isArchived: false,
    },
  });
};
