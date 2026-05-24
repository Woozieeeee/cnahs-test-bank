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

  const activities = recentUsers.map((user) => ({
    id: user.id,

    message:
      user.status === "APPROVED"
        ? `${user.name} was approved.`
        : user.status === "REJECTED"
          ? `${user.name} was rejected.`
          : `${user.name} registered an account.`,

    createdAt: user.createdAt,
  }));

  return activities;
};
