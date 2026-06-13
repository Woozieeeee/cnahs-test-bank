import { Request, Response } from "express";
import {
  getStudentPreferencesService,
  updateStudentPreferencesService,
} from "../../../services/student/settings/student_preferences_service";

/**
 * GET student preferences
 */
export const getStudentPreferencesController = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = (req as any).user?.id;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Student ID not found",
      });
    }

    const preferences = await getStudentPreferencesService(studentId);

    console.log(
      "[StudentPreferencesController] Fetched preferences for student:",
      studentId
    );

    return res.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error(
      "[StudentPreferencesController] Error fetching preferences:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch preferences",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * PATCH student preferences
 */
export const updateStudentPreferencesController = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = (req as any).user?.id;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Student ID not found",
      });
    }

    const {
      pushNotifications,
      examReminders,
      soundEnabled,
      studyGoals,
      analyticsTracking,
    } = req.body;

    // Validate that at least one field is provided
    if (
      pushNotifications === undefined &&
      examReminders === undefined &&
      soundEnabled === undefined &&
      studyGoals === undefined &&
      analyticsTracking === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one preference field must be provided",
      });
    }

    const preferences = await updateStudentPreferencesService(studentId, {
      pushNotifications,
      examReminders,
      soundEnabled,
      studyGoals,
      analyticsTracking,
    });

    console.log(
      "[StudentPreferencesController] Updated preferences for student:",
      studentId
    );

    return res.json({
      success: true,
      message: "Preferences updated successfully",
      data: preferences,
    });
  } catch (error) {
    console.error(
      "[StudentPreferencesController] Error updating preferences:",
      error
    );

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("field must be provided")) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      error: errorMessage,
    });
  }
};
