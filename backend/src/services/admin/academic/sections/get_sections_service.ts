import prisma from "../../../../lib/prisma";

export const getSectionsService = async () => {
  return prisma.section.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      users: true,

      exams: true,
    },
  });
};
