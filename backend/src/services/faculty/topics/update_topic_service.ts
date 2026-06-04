import prisma from "../../../lib/prisma";

interface UpdateTopicData {
  facultyId: number;

  topicId: number;

  name: string;

  description?: string;
}

export const updateTopicService = async ({
  facultyId,
  topicId,
  name,
  description,
}: UpdateTopicData) => {
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

    include: {
      subject: true,
    },
  });

  if (!topic) {
    throw new Error("Topic not found");
  }

  const normalizedName = name.trim().toLowerCase();

  const existingTopics = await prisma.topic.findMany({
    where: {
      subjectId: topic.subjectId,

      NOT: {
        id: topicId,
      },
    },

    select: {
      name: true,
    },
  });

  const duplicate = existingTopics.find(
    (item) => item.name.trim().toLowerCase() === normalizedName,
  );

  if (duplicate) {
    throw new Error("Topic already exists");
  }

  return prisma.topic.update({
    where: {
      id: topicId,
    },

    data: {
      name,

      description,
    },
  });
};
