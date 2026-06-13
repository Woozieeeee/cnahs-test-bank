"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentPreferencesController = exports.getStudentPreferencesController = void 0;
const student_preferences_service_1 = require("../../../services/student/settings/student_preferences_service");
/**
 * GET student preferences
 */
const getStudentPreferencesController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Student ID not found",
            });
        }
        const preferences = await (0, student_preferences_service_1.getStudentPreferencesService)(studentId);
        console.log("[StudentPreferencesController] Fetched preferences for student:", studentId);
        return res.json({
            success: true,
            data: preferences,
        });
    }
    catch (error) {
        console.error("[StudentPreferencesController] Error fetching preferences:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch preferences",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getStudentPreferencesController = getStudentPreferencesController;
/**
 * PATCH student preferences
 */
const updateStudentPreferencesController = async (req, res) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Student ID not found",
            });
        }
        const { pushNotifications, examReminders, soundEnabled, studyGoals, analyticsTracking, } = req.body;
        // Validate that at least one field is provided
        if (pushNotifications === undefined &&
            examReminders === undefined &&
            soundEnabled === undefined &&
            studyGoals === undefined &&
            analyticsTracking === undefined) {
            return res.status(400).json({
                success: false,
                message: "At least one preference field must be provided",
            });
        }
        const preferences = await (0, student_preferences_service_1.updateStudentPreferencesService)(studentId, {
            pushNotifications,
            examReminders,
            soundEnabled,
            studyGoals,
            analyticsTracking,
        });
        console.log("[StudentPreferencesController] Updated preferences for student:", studentId);
        return res.json({
            success: true,
            message: "Preferences updated successfully",
            data: preferences,
        });
    }
    catch (error) {
        console.error("[StudentPreferencesController] Error updating preferences:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
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
exports.updateStudentPreferencesController = updateStudentPreferencesController;
