"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSettingsController = void 0;
const update_notification_settings_service_1 = require("../../../services/admin/settings/update_notification_settings_service");
const updateNotificationSettingsController = async (req, res) => {
    try {
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Admin ID not found",
            });
        }
        const settings = await (0, update_notification_settings_service_1.updateNotificationSettingsService)(req.body);
        console.log("[NotificationSettingsController] Notification settings updated by admin:", adminId);
        return res.json({
            success: true,
            message: "Notification settings updated successfully",
            data: settings,
        });
    }
    catch (error) {
        console.error("[NotificationSettingsController] Error updating settings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update notification settings",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.updateNotificationSettingsController = updateNotificationSettingsController;
