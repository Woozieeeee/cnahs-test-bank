"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFacultyPasswordController = void 0;
const change_password_service_1 = require("../../../services/admin/settings/change_password_service");
/**
 * Faculty password change endpoint
 * Uses the same service as admin for consistency
 */
const changeFacultyPasswordController = async (req, res) => {
    try {
        const facultyId = req.user?.id;
        if (!facultyId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Faculty ID not found",
            });
        }
        const { currentPassword, newPassword } = req.body;
        // Validate required fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }
        const result = await (0, change_password_service_1.changePasswordService)({
            userId: facultyId,
            currentPassword,
            newPassword,
        });
        console.log("[ChangeFacultyPasswordController] Password changed for faculty:", facultyId);
        return res.json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        console.error("[ChangeFacultyPasswordController] Error changing password:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to change password";
        // Handle specific error cases
        if (errorMessage.includes("incorrect") ||
            errorMessage.includes("different") ||
            errorMessage.includes("characters")) {
            return res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to change password",
            error: errorMessage,
        });
    }
};
exports.changeFacultyPasswordController = changeFacultyPasswordController;
