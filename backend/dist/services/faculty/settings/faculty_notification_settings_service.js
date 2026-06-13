"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyNotificationSettingsService = exports.getFacultyNotificationSettingsService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
/**
 * Get faculty notification settings
 * Auto-creates with defaults if not exists
 */
const getFacultyNotificationSettingsService = async (facultyId) => {
    try {
        if (!facultyId) {
            throw new Error("Faculty ID is required");
        }
        // Check if settings exist
        let settings = await prisma_1.default.facultyNotificationSettings.findUnique({
            where: { facultyId },
            select: {
                id: true,
                facultyId: true,
                inAppNotifications: true,
                dashboardAlerts: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        // Auto-create with defaults if not exists
        if (!settings) {
            settings = await prisma_1.default.facultyNotificationSettings.create({
                data: {
                    facultyId,
                    inAppNotifications: true,
                    dashboardAlerts: true,
                },
                select: {
                    id: true,
                    facultyId: true,
                    inAppNotifications: true,
                    dashboardAlerts: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            console.log(`[FacultyNotificationSettingsService] Created default settings for faculty ${facultyId}`);
        }
        return settings;
    }
    catch (error) {
        console.error("[FacultyNotificationSettingsService] Error fetching settings:", error);
        throw error;
    }
};
exports.getFacultyNotificationSettingsService = getFacultyNotificationSettingsService;
/**
 * Update faculty notification settings
 */
const updateFacultyNotificationSettingsService = async (facultyId, data) => {
    try {
        if (!facultyId) {
            throw new Error("Faculty ID is required");
        }
        // Ensure settings exist first
        const existing = await (0, exports.getFacultyNotificationSettingsService)(facultyId);
        if (!existing) {
            throw new Error("Failed to initialize settings");
        }
        // Update only provided fields
        const updated = await prisma_1.default.facultyNotificationSettings.update({
            where: { facultyId },
            data: {
                ...(data.inAppNotifications !== undefined && {
                    inAppNotifications: data.inAppNotifications,
                }),
                ...(data.dashboardAlerts !== undefined && {
                    dashboardAlerts: data.dashboardAlerts,
                }),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                facultyId: true,
                inAppNotifications: true,
                dashboardAlerts: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log(`[FacultyNotificationSettingsService] Updated settings for faculty ${facultyId}`);
        return updated;
    }
    catch (error) {
        console.error("[FacultyNotificationSettingsService] Error updating settings:", error);
        throw error;
    }
};
exports.updateFacultyNotificationSettingsService = updateFacultyNotificationSettingsService;
