"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldDeliverNotification = shouldDeliverNotification;
exports.filterDeliverableUserIds = filterDeliverableUserIds;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const faculty_exam_preferences_service_1 = require("../faculty/settings/faculty_exam_preferences_service");
const faculty_notification_settings_service_1 = require("../faculty/settings/faculty_notification_settings_service");
const student_preferences_service_1 = require("../student/settings/student_preferences_service");
const get_system_settings_service_1 = require("../admin/settings/get_system_settings_service");
const notification_types_1 = require("./notification_types");
const EXAM_REMINDER_TYPES = new Set([
    notification_types_1.NotificationType.EXAM_STARTING_SOON,
    notification_types_1.NotificationType.DEADLINE_REMINDER,
]);
const STUDENT_PROGRESS_TYPES = new Set([
    notification_types_1.NotificationType.PROGRESS_MILESTONE,
    notification_types_1.NotificationType.DIFFICULTY_LEVEL_UNLOCK,
    notification_types_1.NotificationType.LOW_PERFORMANCE_ALERT,
]);
const FACULTY_EXAM_TYPES = new Set([
    notification_types_1.NotificationType.EXAM_CREATED,
    notification_types_1.NotificationType.EXAM_PUBLISHED,
    notification_types_1.NotificationType.EXAM_STARTED,
    notification_types_1.NotificationType.EXAM_COMPLETED_FACULTY,
    notification_types_1.NotificationType.STUDENT_SUBMISSION_RECEIVED,
    notification_types_1.NotificationType.EXAM_PERFORMANCE_SUMMARY,
]);
const FACULTY_VIOLATION_TYPES = new Set([
    notification_types_1.NotificationType.VIOLATION_DETECTED,
]);
const FACULTY_PROGRESS_TYPES = new Set([
    notification_types_1.NotificationType.STUDENT_PERFORMANCE_ALERT,
]);
const ADMIN_CRITICAL_TYPES = new Set([
    notification_types_1.NotificationType.EXAM_VIOLATION_ESCALATION,
    notification_types_1.NotificationType.SECURITY_ALERT,
    notification_types_1.NotificationType.SYSTEM_ERROR_LOGGED,
    notification_types_1.NotificationType.SUSPICIOUS_ACTIVITY_DETECTED,
    notification_types_1.NotificationType.PASSWORD_RESET_REQUEST,
]);
async function shouldDeliverToStudent(studentId, type) {
    const preferences = await (0, student_preferences_service_1.getStudentPreferencesService)(studentId);
    if (!preferences.pushNotifications) {
        return false;
    }
    if (EXAM_REMINDER_TYPES.has(type)) {
        return preferences.examReminders;
    }
    if (STUDENT_PROGRESS_TYPES.has(type)) {
        return preferences.studyGoals;
    }
    return true;
}
async function shouldDeliverToFaculty(facultyId, type) {
    const [notificationSettings, examPreferences] = await Promise.all([
        (0, faculty_notification_settings_service_1.getFacultyNotificationSettingsService)(facultyId),
        (0, faculty_exam_preferences_service_1.getFacultyExamPreferencesService)(facultyId),
    ]);
    if (!notificationSettings.inAppNotifications) {
        return false;
    }
    if (FACULTY_VIOLATION_TYPES.has(type)) {
        return examPreferences.violationAlerts;
    }
    if (FACULTY_EXAM_TYPES.has(type)) {
        return examPreferences.examNotifications;
    }
    if (FACULTY_PROGRESS_TYPES.has(type)) {
        return examPreferences.studentProgressUpdates;
    }
    return notificationSettings.dashboardAlerts;
}
async function shouldDeliverToAdmin(type, priority) {
    const settings = await (0, get_system_settings_service_1.getSystemSettingsService)();
    if (ADMIN_CRITICAL_TYPES.has(type)) {
        return settings.criticalSystemAlerts;
    }
    if (type === notification_types_1.NotificationType.SYSTEM_ALERT && priority === "HIGH") {
        return settings.criticalSystemAlerts;
    }
    if (!settings.inAppNotifications) {
        return false;
    }
    return settings.dashboardAlerts;
}
async function shouldDeliverNotification(userId, type, priority) {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });
    if (!user) {
        return false;
    }
    switch (user.role) {
        case client_1.Role.STUDENT:
            return shouldDeliverToStudent(userId, type);
        case client_1.Role.FACULTY:
            return shouldDeliverToFaculty(userId, type);
        case client_1.Role.ADMIN:
            return shouldDeliverToAdmin(type, priority);
        default:
            return true;
    }
}
async function filterDeliverableUserIds(userIds, type, priority) {
    const results = await Promise.all(userIds.map(async (userId) => ({
        userId,
        allowed: await shouldDeliverNotification(userId, type, priority),
    })));
    return results.filter((result) => result.allowed).map((result) => result.userId);
}
