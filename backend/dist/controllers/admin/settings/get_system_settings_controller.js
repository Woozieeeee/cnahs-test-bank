"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemSettingsController = void 0;
const get_system_settings_service_1 = require("../../../services/admin/settings/get_system_settings_service");
const getSystemSettingsController = async (req, res) => {
    try {
        const settings = await (0, get_system_settings_service_1.getSystemSettingsService)();
        return res.json({
            success: true,
            data: settings,
        });
    }
    catch (error) {
        console.error("[SystemSettingsController] Error fetching settings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch system settings",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSystemSettingsController = getSystemSettingsController;
