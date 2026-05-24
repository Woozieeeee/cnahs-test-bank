import prisma from "../../../lib/prisma";

export const getRecentActivityService = async () => {
  // =========================
  // RECENT REGISTRATIONS
  // =========================

  const recentUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });

  // =========================
  // FORMAT ACTIVITIES
  // =========================

  const activities = await prisma.activityLog.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });

  return activities;
};
