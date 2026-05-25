import prisma from "../../../lib/prisma";

const HIDDEN_ACTIONS = [
  "APPROVE_STUDENT",
  "REJECT_STUDENT",
  "CREATE_FACULTY",
];

export const getRecentActivityService = async () => {
  const activities = await prisma.activityLog.findMany({
    where: {
      NOT: [
        {
          action: {
            in: HIDDEN_ACTIONS,
          },
        },

        {
          action: {
            startsWith: "GET ",
          },
        },

        {
          action: "Viewed dashboard",
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });

  return activities;
};
