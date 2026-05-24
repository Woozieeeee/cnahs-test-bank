import prisma from "../../../lib/prisma";

interface GetActivityLogsParams {
  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  severity?: string;
}

export const getActivityLogsService = async ({
  page = 1,

  limit = 10,

  search = "",

  category,

  severity,
}: GetActivityLogsParams) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  // SEARCH
  if (search) {
    where.OR = [
      {
        action: {
          contains: search,
        },
      },

      {
        performedBy: {
          contains: search,
        },
      },

      {
        targetUser: {
          contains: search,
        },
      },

      {
        description: {
          contains: search,
        },
      },
    ];
  }

  // CATEGORY FILTER
  if (category && category !== "ALL") {
    where.category = category;
  }

  // SEVERITY FILTER
  if (severity && severity !== "ALL") {
    where.severity = severity;
  }

  const logs = await prisma.activityLog.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    skip,

    take: limit,
  });

  const total = await prisma.activityLog.count({
    where,
  });

  return {
    logs,

    totalPages: Math.ceil(total / limit),

    currentPage: page,
  };
};
