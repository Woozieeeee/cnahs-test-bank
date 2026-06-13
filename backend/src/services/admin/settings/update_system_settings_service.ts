import prisma from "../../../lib/prisma";

interface UpdateSystemSettingsInput {
  sessionTimeoutHours?: number;
  maxLoginAttempts?: number;
  dataRetentionDays?: number;
  maxConcurrentUsers?: number;
  passwordExpiryDays?: number;
  forcePasswordExpiry?: boolean;
  enableTwoFactor?: boolean;
  trackLoginHistory?: boolean;
  enableIpWhitelist?: boolean;
  ipWhitelistJson?: string[];
  inAppNotifications?: boolean;
  dashboardAlerts?: boolean;
  criticalSystemAlerts?: boolean;
}

export const updateSystemSettingsService = async (
  data: UpdateSystemSettingsInput
) => {
  try {
    // Validate numeric fields are within reasonable ranges
    if (data.sessionTimeoutHours !== undefined) {
      if (data.sessionTimeoutHours < 1 || data.sessionTimeoutHours > 720) {
        throw new Error("Session timeout must be between 1 and 720 hours");
      }
    }

    if (data.maxLoginAttempts !== undefined) {
      if (data.maxLoginAttempts < 1 || data.maxLoginAttempts > 10) {
        throw new Error("Max login attempts must be between 1 and 10");
      }
    }

    if (data.dataRetentionDays !== undefined) {
      if (data.dataRetentionDays < 1 || data.dataRetentionDays > 3650) {
        throw new Error("Data retention must be between 1 and 3650 days");
      }
    }

    if (data.maxConcurrentUsers !== undefined) {
      if (data.maxConcurrentUsers < 1 || data.maxConcurrentUsers > 10000) {
        throw new Error(
          "Max concurrent users must be between 1 and 10000"
        );
      }
    }

    // Update settings (assuming only one record with id=1)
    const settings = await prisma.systemSettings.update({
      where: { id: 1 },
      data: {
        sessionTimeoutHours: data.sessionTimeoutHours,
        maxLoginAttempts: data.maxLoginAttempts,
        dataRetentionDays: data.dataRetentionDays,
        maxConcurrentUsers: data.maxConcurrentUsers,
        passwordExpiryDays: data.passwordExpiryDays,
        forcePasswordExpiry: data.forcePasswordExpiry,
        enableTwoFactor: data.enableTwoFactor,
        trackLoginHistory: data.trackLoginHistory,
        enableIpWhitelist: data.enableIpWhitelist,
        ipWhitelistJson: data.ipWhitelistJson
          ? JSON.stringify(data.ipWhitelistJson)
          : undefined,
        inAppNotifications: data.inAppNotifications,
        dashboardAlerts: data.dashboardAlerts,
        criticalSystemAlerts: data.criticalSystemAlerts,
        updatedAt: new Date(),
      },
    });

    console.log("[SystemSettingsService] Settings updated:", settings.id);
    return settings;
  } catch (error) {
    console.error("[SystemSettingsService] Error updating settings:", error);
    throw error;
  }
};
