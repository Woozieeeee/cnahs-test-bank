import prisma from "../../../lib/prisma";

export const getPendingStudentsService = async () => {
  return prisma.user.findMany({
    where: {
      role: "STUDENT",

      status: "PENDING",
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
