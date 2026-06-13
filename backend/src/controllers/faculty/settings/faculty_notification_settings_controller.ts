import { Request, Response } from "express";
import {
  getFacultyNotificationSettingsService,
  updateFacultyNotificationSettingsService,
} from "../../../services/faculty/settings/faculty_notification_settings_service";

/**
 * GET faculty notification settings
 */
export const getFacultyNotificationSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user?.id;

    if (!facultyId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Faculty ID not found",
      });
    }

    const settings = await getFacultyNotificationSettingsService(facultyId);

    console.log(
      "[FacultyNotificationSettingsController] Fetched settings for faculty:",
      facultyId
    );

    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(
      "[FacultyNotificationSettingsController] Error fetching settings:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notification settings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * PATCH faculty notification settings
 */
export const updateFacultyNotificationSettingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const facultyId = (req as any).user?.id;

    if (!facultyId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Faculty ID not found",
      });
    }

    const { inAppNotifications, dashboardAlerts } = req.body;

    // Validate that at least one field is provided
    if (inAppNotifications === undefined && dashboardAlerts === undefined) {
      return res.status(400).json({
        success: false,
        message: "At least one setting field must be provided",
      });
    }

    const settings = await updateFacultyNotificationSettingsService(
      facultyId,
      {
        inAppNotifications,
        dashboardAlerts,
      }
    );

    console.log(
      "[FacultyNotificationSettingsController] Updated settings for faculty:",
      facultyId
    );

    return res.json({
      success: true,
      message: "Notification settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error(
      "[FacultyNotificationSettingsController] Error updating settings:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notification settings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
