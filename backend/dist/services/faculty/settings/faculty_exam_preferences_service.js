"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyExamPreferencesService = exports.getFacultyExamPreferencesService = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
/**
 * Get faculty exam preferences
 * Auto-creates with defaults if not exists
 */
const getFacultyExamPreferencesService = async (facultyId) => {
    try {
        if (!facultyId) {
            throw new Error("Faculty ID is required");
        }
        // Check if preferences exist
        let preferences = await prisma_1.default.facultyExamPreferences.findUnique({
            where: { facultyId },
            select: {
                id: true,
                facultyId: true,
                examNotifications: true,
                violationAlerts: true,
                autoSubmitNotification: true,
                studentProgressUpdates: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        // Auto-create with defaults if not exists
        if (!preferences) {
            preferences = await prisma_1.default.facultyExamPreferences.create({
                data: {
                    facultyId,
                    examNotifications: true,
                    violationAlerts: true,
                    autoSubmitNotification: true,
                    studentProgressUpdates: false,
                },
                select: {
                    id: true,
                    facultyId: true,
                    examNotifications: true,
                    violationAlerts: true,
                    autoSubmitNotification: true,
                    studentProgressUpdates: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            console.log(`[FacultyExamPreferencesService] Created default preferences for faculty ${facultyId}`);
        }
        return preferences;
    }
    catch (error) {
        console.error("[FacultyExamPreferencesService] Error fetching preferences:", error);
        throw error;
    }
};
exports.getFacultyExamPreferencesService = getFacultyExamPreferencesService;
/**
 * Update faculty exam preferences
 */
const updateFacultyExamPreferencesService = async (facultyId, data) => {
    try {
        if (!facultyId) {
            throw new Error("Faculty ID is required");
        }
        // Ensure preferences exist first
        const existing = await (0, exports.getFacultyExamPreferencesService)(facultyId);
        if (!existing) {
            throw new Error("Failed to initialize preferences");
        }
        // Update only provided fields
        const updated = await prisma_1.default.facultyExamPreferences.update({
            where: { facultyId },
            data: {
                ...(data.examNotifications !== undefined && {
                    examNotifications: data.examNotifications,
                }),
                ...(data.violationAlerts !== undefined && {
                    violationAlerts: data.violationAlerts,
                }),
                ...(data.autoSubmitNotification !== undefined && {
                    autoSubmitNotification: data.autoSubmitNotification,
                }),
                ...(data.studentProgressUpdates !== undefined && {
                    studentProgressUpdates: data.studentProgressUpdates,
                }),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                facultyId: true,
                examNotifications: true,
                violationAlerts: true,
                autoSubmitNotification: true,
                studentProgressUpdates: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log(`[FacultyExamPreferencesService] Updated preferences for faculty ${facultyId}`);
        return updated;
    }
    catch (error) {
        console.error("[FacultyExamPreferencesService] Error updating preferences:", error);
        throw error;
    }
};
exports.updateFacultyExamPreferencesService = updateFacultyExamPreferencesService;
