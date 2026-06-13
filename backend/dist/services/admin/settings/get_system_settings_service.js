"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemSettingsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const getSystemSettingsService = async () => {
    try {
        let settings = await prisma_1.default.systemSettings.findUnique({
            where: { id: 1 },
        });
        // If settings don't exist, create default settings
        if (!settings) {
            settings = await prisma_1.default.systemSettings.create({
                data: {
                    sessionTimeoutHours: 24,
                    maxLoginAttempts: 5,
                    dataRetentionDays: 90,
                    maxConcurrentUsers: 1000,
                    passwordExpiryDays: 90,
                    forcePasswordExpiry: true,
                    enableTwoFactor: false,
                    trackLoginHistory: true,
                    enableIpWhitelist: false,
                    inAppNotifications: true,
                    dashboardAlerts: true,
                    criticalSystemAlerts: true,
                },
            });
        }
        return settings;
    }
    catch (error) {
        console.error("[SystemSettingsService] Error fetching settings:", error);
        throw error;
    }
};
exports.getSystemSettingsService = getSystemSettingsService;
