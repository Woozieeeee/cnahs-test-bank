import prisma from "../../../../lib/prisma";

export const getSectionsService = async () => {
  return prisma.section.findMany({
    orderBy: [
      {
        isArchived: "asc",
      },

      {
        updatedAt: "desc",
      },
    ],

    include: {
      users: true,

      exams: true,
    },
  });
};
