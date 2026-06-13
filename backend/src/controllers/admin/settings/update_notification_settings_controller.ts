import { Request, Response } from "express";
import { updateNotificationSettingsService } from "../../../services/admin/settings/update_notification_settings_service";

export const updateNotificationSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const adminId = (req as any).user?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Admin ID not found",
      });
    }

    const settings = await updateNotificationSettingsService(req.body);

    console.log(
      "[NotificationSettingsController] Notification settings updated by admin:",
      adminId
    );

    return res.json({
      success: true,
      message: "Notification settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error(
      "[NotificationSettingsController] Error updating settings:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notification settings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
