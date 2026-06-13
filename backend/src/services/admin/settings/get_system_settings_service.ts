import prisma from "../../../lib/prisma";

export const getSystemSettingsService = async () => {
  try {
    let settings = await prisma.systemSettings.findUnique({
      where: { id: 1 },
    });

    // If settings don't exist, create default settings
    if (!settings) {
      settings = await prisma.systemSettings.create({
        data: {
          sessionTimeoutHours: 24,
          maxLoginAttempts: 5,
          dataRetentionDays: 90,
          maxConcurrentUsers: 1000,
          passwordExpiryDays: 90,
          forcePasswordExpiry: true,
          enableTwoFactor: false,
          trackLoginHistory: true,
          enableIpWhitelist: false,
          inAppNotifications: true,
          dashboardAlerts: true,
          criticalSystemAlerts: true,
        },
      });
    }

    return settings;
  } catch (error) {
    console.error("[SystemSettingsService] Error fetching settings:", error);
    throw error;
  }
};
