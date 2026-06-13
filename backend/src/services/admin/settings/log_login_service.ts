import prisma from "../../../lib/prisma";

interface LogLoginInput {
  userId: number;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
}

/**
 * Logs user login attempt to database
 * Called automatically after successful authentication
 */
export const logLoginService = async (data: LogLoginInput) => {
  try {
    const { userId, ipAddress, userAgent, success = true } = data;

    if (!userId) {
      throw new Error("User ID is required");
    }

    const loginRecord = await prisma.loginHistory.create({
      data: {
        userId,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        success,
        loginTime: new Date(),
      },
      select: {
        id: true,
        userId: true,
        loginTime: true,
        success: true,
      },
    });

    console.log(
      `[LoginService] Login logged for user ${userId} from IP ${ipAddress || "unknown"}`
    );

    return loginRecord;
  } catch (error) {
    console.error("[LoginService] Error logging login:", error);
    throw error;
  }
};

/**
 * Records logout time for an active login session
 */
export const logLogoutService = async (userId: number) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Find the most recent login record without logout time
    const activeLogin = await prisma.loginHistory.findFirst({
      where: {
        userId,
        logoutTime: null,
      },
      orderBy: {
        loginTime: "desc",
      },
    });

    if (!activeLogin) {
      console.warn(`[LogoutService] No active login found for user ${userId}`);
      return null;
    }

    // Update with logout time
    const updatedRecord = await prisma.loginHistory.update({
      where: { id: activeLogin.id },
      data: {
        logoutTime: new Date(),
      },
      select: {
        id: true,
        userId: true,
        loginTime: true,
        logoutTime: true,
      },
    });

    console.log(`[LogoutService] Logout logged for user ${userId}`);
    return updatedRecord;
  } catch (error) {
    console.error("[LogoutService] Error logging logout:", error);
    throw error;
  }
};

/**
 * Gets login history for a specific user (admin only)
 */
export const getLoginHistoryService = async (userId: number, limit = 50) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const loginHistory = await prisma.loginHistory.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        ipAddress: true,
        userAgent: true,
        loginTime: true,
        logoutTime: true,
        success: true,
      },
      orderBy: {
        loginTime: "desc",
      },
      take: limit,
    });

    return loginHistory;
  } catch (error) {
    console.error("[LoginHistoryService] Error fetching login history:", error);
    throw error;
  }
};

/**
 * Gets recent login attempts (for admin dashboard)
 */
export const getRecentLoginAttemptsService = async (limit = 20) => {
  try {
    const recentLogins = await prisma.loginHistory.findMany({
      select: {
        id: true,
        userId: true,
        ipAddress: true,
        userAgent: true,
        loginTime: true,
        success: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        loginTime: "desc",
      },
      take: limit,
    });

    return recentLogins;
  } catch (error) {
    console.error(
      "[RecentLoginAttemptsService] Error fetching recent logins:",
      error
    );
    throw error;
  }
};
