import prisma from "../../../lib/prisma";

interface GetUsersParams {
  page?: number;

  limit?: number;
}

export const getUsersService = async ({
  page = 1,

  limit = 10,
}: GetUsersParams) => {
  const skip = (page - 1) * limit;

  // =========================
  // USERS
  // =========================

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        role: "ADMIN",
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    skip,

    take: limit,

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

  // =========================
  // TOTAL USERS
  // =========================

  const totalUsers = await prisma.user.count({
    where: {
      NOT: {
        role: "ADMIN",
      },
    },
  });

  return {
    users,

    totalUsers,

    totalPages: Math.ceil(totalUsers / limit),

    currentPage: page,
  };
};
