import prisma from "../../../lib/prisma";

interface GetUsersParams {
  page?: number;

  limit?: number;

  search?: string;

  role?: string;

  status?: string;
}

export const getUsersService = async ({
  page = 1,

  limit = 10,

  search = "",

  role = "ALL",

  status = "ALL",
}: GetUsersParams) => {
  const skip = (page - 1) * limit;

  // =========================
  // FILTERS
  // =========================

  const whereClause: any = {
    NOT: {
      role: "ADMIN",
    },
  };

  // SEARCH

  if (search) {
    whereClause.OR = [
      {
        name: {
          contains: search,
        },
      },

      {
        studentId: {
          contains: search,
        },
      },
    ];
  }

  // ROLE FILTER

  if (role !== "ALL") {
    whereClause.role = role;
  }

  // STATUS FILTER

  if (status !== "ALL") {
    whereClause.status = status;
  }

  // =========================
  // USERS
  // =========================

  const users = await prisma.user.findMany({
    where: whereClause,

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
    where: whereClause,
  });

  return {
    users,

    totalUsers,

    totalPages: Math.ceil(totalUsers / limit),

    currentPage: page,
  };
};
