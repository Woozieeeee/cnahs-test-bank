import prisma from "../../../lib/prisma";

interface TrackLoginInput {
  userId: number;
  ipAddress?: string;
  userAgent?: string;
}

export const trackLoginHistoryService = async (data: TrackLoginInput) => {
  try {
    const { userId, ipAddress, userAgent } = data;

    // Create login history record
    const loginHistory = await prisma.loginHistory.create({
      data: {
        userId,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        success: true,
        loginTime: new Date(),
      },
    });

    console.log(`[LoginHistoryService] Login tracked for user: ${userId}`);
    return loginHistory;
  } catch (error) {
    console.error("[LoginHistoryService] Error tracking login:", error);
    throw error;
  }
};

export const getLoginHistoryService = async (userId: number, limit: number = 10) => {
  try {
    const loginHistory = await prisma.loginHistory.findMany({
      where: { userId },
      orderBy: { loginTime: "desc" },
      take: limit,
    });

    return loginHistory;
  } catch (error) {
    console.error("[LoginHistoryService] Error fetching login history:", error);
    throw error;
  }
};
