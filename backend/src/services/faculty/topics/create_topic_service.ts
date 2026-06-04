import prisma from "../../../lib/prisma";

interface CreateTopicData {
  facultyId: number;

  subjectId: number;

  name: string;

  description?: string;
}

export const createTopicService = async ({
  facultyId,
  subjectId,
  name,
  description,
}: CreateTopicData) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,

      faculties: {
        some: {
          facultyId,
        },
      },
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  const normalizedName = name.trim().toLowerCase();

  const existingTopic = await prisma.topic.findMany({
    where: {
      subjectId,
    },

    select: {
      name: true,
    },
  });

  const duplicate = existingTopic.find(
    (topic) => topic.name.trim().toLowerCase() === normalizedName,
  );

  if (duplicate) {
    throw new Error("Topic already exists");
  }

  return prisma.topic.create({
    data: {
      name,

      description,

      subjectId,
    },
  });
};
