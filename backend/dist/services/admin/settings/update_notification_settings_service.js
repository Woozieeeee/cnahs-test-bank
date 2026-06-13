"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSettingsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const updateNotificationSettingsService = async (data) => {
    try {
        // Prepare update data
        const updateData = {};
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
        const settings = await prisma_1.default.systemSettings.update({
            where: { id: 1 },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
        console.log("[NotificationSettingsService] Notification settings updated");
        return settings;
    }
    catch (error) {
        console.error("[NotificationSettingsService] Error updating settings:", error);
        throw error;
    }
};
exports.updateNotificationSettingsService = updateNotificationSettingsService;
