import prisma from "../../../lib/prisma";

interface GetFacultyActivityLogsParams {
  facultyId: number;

  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  severity?: string;
}

const HIDDEN_ACTIONS = ["APPROVE_STUDENT", "REJECT_STUDENT", "CREATE_FACULTY"];

export const getFacultyActivityLogsService = async ({
  facultyId,
  page = 1,
  limit = 10,
  search = "",
  category,
  severity,
}: GetFacultyActivityLogsParams) => {
  const skip = (page - 1) * limit;

  const where: any = {
    performedBy: String(facultyId),

    NOT: [
      {
        action: {
          in: HIDDEN_ACTIONS,
        },
      },
    ],
  };

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

  // SEVERITY FILTER

  if (severity && severity !== "ALL") {
    where.severity = severity;
  }

  // FETCH ALL LOGS

  const allLogs = await prisma.activityLog.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },
  });

  // CATEGORY FILTER

  const filteredLogs =
    category && category !== "ALL"
      ? allLogs.filter(
          (log) =>
            Array.isArray(log.categories) && log.categories.includes(category),
        )
      : allLogs;

  // MANUAL PAGINATION

  const paginatedLogs = filteredLogs.slice(skip, skip + limit);

  return {
    logs: paginatedLogs,

    totalPages: Math.ceil(filteredLogs.length / limit),

    currentPage: page,
  };
};
