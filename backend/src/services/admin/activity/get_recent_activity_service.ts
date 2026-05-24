import prisma from "../../../lib/prisma";

export const getRecentActivityService = async () => {
  // =========================
  // RECENT REGISTRATIONS
  // =========================

  const recentUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });

  // =========================
  // FORMAT ACTIVITIES
  // =========================

  const activities = await prisma.activityLog.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });

  return activities;
};
