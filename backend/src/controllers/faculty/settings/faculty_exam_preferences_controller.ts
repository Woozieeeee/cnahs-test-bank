import { Request, Response } from "express";
import {
  getFacultyExamPreferencesService,
  updateFacultyExamPreferencesService,
} from "../../../services/faculty/settings/faculty_exam_preferences_service";

/**
 * GET faculty exam preferences
 */
export const getFacultyExamPreferencesController = async (
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

    const preferences = await getFacultyExamPreferencesService(facultyId);

    console.log(
      "[FacultyExamPreferencesController] Fetched preferences for faculty:",
      facultyId
    );

    return res.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error(
      "[FacultyExamPreferencesController] Error fetching preferences:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam preferences",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * PATCH faculty exam preferences
 */
export const updateFacultyExamPreferencesController = async (
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

    const { examNotifications, violationAlerts, autoSubmitNotification, studentProgressUpdates } =
      req.body;

    // Validate that at least one field is provided
    if (
      examNotifications === undefined &&
      violationAlerts === undefined &&
      autoSubmitNotification === undefined &&
      studentProgressUpdates === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one preference field must be provided",
      });
    }

    const preferences = await updateFacultyExamPreferencesService(facultyId, {
      examNotifications,
      violationAlerts,
      autoSubmitNotification,
      studentProgressUpdates,
    });

    console.log(
      "[FacultyExamPreferencesController] Updated preferences for faculty:",
      facultyId
    );

    return res.json({
      success: true,
      message: "Exam preferences updated successfully",
      data: preferences,
    });
  } catch (error) {
    console.error(
      "[FacultyExamPreferencesController] Error updating preferences:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update exam preferences",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
