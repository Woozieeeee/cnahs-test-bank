import prisma from "../../../lib/prisma";

export const getTopicsService = async (
  facultyId: number,
  subjectId: number,
) => {
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

  const topics = await prisma.topic.findMany({
    where: {
      subjectId,
    },

    include: {
      questions: true,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  return topics.map((topic) => ({
    id: topic.id,

    name: topic.name,

    description: topic.description,

    totalQuestions: topic.questions.length,

    isArchived: topic.isArchived,
  }));
};
