import prisma from "../../lib/prisma";

export const getUsersService = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,

      name: true,

      studentId: true,

      username: true,

      role: true,

      status: true,

      createdAt: true,
    },
  });

  return users;
};
