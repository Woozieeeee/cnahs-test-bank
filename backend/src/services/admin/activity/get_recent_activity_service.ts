import prisma from "../../../lib/prisma";

export const getRecentActivityService = async () => {
  const activities = await prisma.activityLog.findMany({
    where: {
      NOT: [
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
