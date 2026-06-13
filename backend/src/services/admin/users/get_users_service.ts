import prisma from "../../../lib/prisma";
import { Prisma, Role } from "@prisma/client";

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

const userSelect = {
  id: true,
  name: true,
  studentId: true,
  username: true,
  role: true,
  status: true,
  createdAt: true,
} as const;

type UserListItem = Prisma.UserGetPayload<{ select: typeof userSelect }>;

const ROLE_ORDER: Record<Role, number> = {
  STUDENT: 0,
  FACULTY: 1,
  ADMIN: 2,
};

function buildWhereClause(search: string, role: string, status: string) {
  const whereClause: {
    OR?: Array<{ name: { contains: string } } | { studentId: { contains: string } } | { username: { contains: string } }>;
    role?: Role;
    status?: string;
  } = {};

  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { studentId: { contains: search } },
      { username: { contains: search } },
    ];
  }

  if (role !== "ALL") {
    whereClause.role = role as Role;
  }

  if (status !== "ALL") {
    whereClause.status = status;
  }

  return whereClause;
}

function sortUsersByRole<T extends { role: Role; createdAt: Date }>(users: T[]): T[] {
  return [...users].sort((a, b) => {
    const roleDiff = ROLE_ORDER[a.role] - ROLE_ORDER[b.role];
    if (roleDiff !== 0) return roleDiff;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export const getUsersService = async ({
  page = 1,
  limit = 10,
  search = "",
  role = "ALL",
  status = "ALL",
}: GetUsersParams) => {
  const skip = (page - 1) * limit;
  const whereClause = buildWhereClause(search, role, status);

  const totalUsers = await prisma.user.count({ where: whereClause });

  let users: UserListItem[];

  if (role === "ALL") {
    const allUsers = await prisma.user.findMany({
      where: whereClause,
      select: { id: true, role: true, createdAt: true },
    });

    const sortedIds = sortUsersByRole(allUsers)
      .slice(skip, skip + limit)
      .map((user) => user.id);

    if (sortedIds.length === 0) {
      users = [];
    } else {
      const pageUsers = await prisma.user.findMany({
        where: { id: { in: sortedIds } },
        select: userSelect,
      });

      const userMap = new Map(pageUsers.map((user) => [user.id, user]));
      users = sortedIds
        .map((id) => userMap.get(id))
        .filter((user): user is NonNullable<typeof user> => Boolean(user));
    }
  } else {
    users = await prisma.user.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: userSelect,
    });
  }

  return {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  };
};
