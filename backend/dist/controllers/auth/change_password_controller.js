"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = void 0;
const log_activity_1 = require("../../utils/log_activity");
const change_password_service_1 = require("../../services/auth/change_password_service");
const changePasswordController = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await (0, change_password_service_1.changePasswordService)(req.user.id, currentPassword, newPassword);
        try {
            await (0, log_activity_1.logActivity)({
                action: "Password changed",
                categories: ["AUTH", "SECURITY"],
                severity: "INFO",
                description: `${user.name} changed account password.`,
                performedBy: user.name,
            });
        }
        catch (error) {
            console.error("Failed to record password change activity:", error);
        }
        return res.status(200).json({
            message: "Password changed successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.changePasswordController = changePasswordController;
