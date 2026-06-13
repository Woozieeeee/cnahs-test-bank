import prisma from "../../../lib/prisma";

interface UpdateNotificationSettingsInput {
  inAppNotifications?: boolean;
  dashboardAlerts?: boolean;
  criticalSystemAlerts?: boolean;
}

export const updateNotificationSettingsService = async (
  data: UpdateNotificationSettingsInput
) => {
  try {
    // Prepare update data
    const updateData: any = {};

    if (data.inAppNotifications !== undefined) {
      updateData.inAppNotifications = data.inAppNotifications;
    }
    if (data.dashboardAlerts !== undefined) {
      updateData.dashboardAlerts = data.dashboardAlerts;
    }
    if (data.criticalSystemAlerts !== undefined) {
      updateData.criticalSystemAlerts = data.criticalSystemAlerts;
    }

    // Update notification settings
    const settings = await prisma.systemSettings.update({
      where: { id: 1 },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    console.log("[NotificationSettingsService] Notification settings updated");
    return settings;
  } catch (error) {
    console.error(
      "[NotificationSettingsService] Error updating settings:",
      error
    );
    throw error;
  }
};
