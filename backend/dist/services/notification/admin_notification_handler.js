"use strict";
/**
 * PHASE 3: ADMIN NOTIFICATION HANDLER
 * Manages notifications for admins including:
 * - System alerts and error monitoring
 * - User account lifecycle management
 * - Exam integrity and violation escalations
 * - Security and suspicious activity alerts
 * - Database and system maintenance updates
 * - User approval workflows and auditing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminNotificationHandler = exports.AdminNotificationHandler = void 0;
const client_1 = require("@prisma/client");
const notification_service_1 = require("./notification_service");
const notification_types_1 = require("./notification_types");
const notification_templates_1 = require("./notification_templates");
const prisma = new client_1.PrismaClient();
class AdminNotificationHandler {
    /**
     * Broadcast system alert to all admins
     */
    async notifySystemAlert(message, severity) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        if (admins.length === 0)
            return;
        const template = notification_templates_1.AdminNotificationTemplates.SYSTEM_ALERT;
        const notificationMessage = template.messageTemplate({ message });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.SYSTEM_ALERT,
            title: template.title,
            message: notificationMessage,
            metadata: {
                severity,
                timestamp: new Date(),
            },
            priority: severity === "CRITICAL" ? "HIGH" : "MEDIUM",
        });
    }
    /**
     * Notify admins when new user account is created
     */
    async notifyUserAccountCreated(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return;
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.USER_ACCOUNT_CREATED;
        const message = template.messageTemplate({
            role: user.role,
            userName: user.name,
            userEmail: user.username || "N/A",
            accountStatus: user.status,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.USER_ACCOUNT_CREATED,
            title: template.title,
            message,
            metadata: {
                userId,
                role: user.role,
                username: user.username,
                status: user.status,
                actionUrl: `/admin/users/${userId}`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Notify admins when user account status changes
     */
    async notifyUserAccountStatusChanged(userId, oldStatus, newStatus, action) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return;
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.USER_ACCOUNT_STATUS_CHANGED;
        const message = template.messageTemplate({
            userName: user.name,
            oldStatus,
            newStatus,
            action,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.USER_ACCOUNT_STATUS_CHANGED,
            title: template.title,
            message,
            metadata: {
                userId,
                oldStatus,
                newStatus,
                action,
                username: user.username,
                actionUrl: `/admin/users/${userId}`,
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Escalate high-severity exam violations to admins
     */
    async notifyExamViolationEscalation(examId, studentId, violationCount, recommendedAction) {
        const exam = await prisma.exam.findUnique({
            where: { id: examId },
        });
        const student = await prisma.user.findUnique({
            where: { id: studentId },
        });
        if (!exam || !student)
            return;
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.EXAM_VIOLATION_ESCALATION;
        const message = template.messageTemplate({
            studentName: student.name,
            examTitle: exam.title,
            violationCount,
            recommendedAction,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.EXAM_VIOLATION_ESCALATION,
            title: template.title,
            message,
            metadata: {
                examId,
                studentId,
                violationCount,
                recommendedAction,
                actionUrl: `/admin/violations?studentId=${studentId}&examId=${examId}`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify admins when bulk import completes
     */
    async notifyBulkImportCompleted(totalRecords, successCount, failureCount, errorCount) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.BULK_IMPORT_COMPLETED;
        const message = template.messageTemplate({
            totalRecords,
            successCount,
            failureCount,
            errorCount,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.BULK_IMPORT_COMPLETED,
            title: template.title,
            message,
            metadata: {
                totalRecords,
                successCount,
                failureCount,
                errorCount,
                timestamp: new Date(),
                actionUrl: "/admin/imports",
            },
            priority: "MEDIUM",
        });
    }
    /**
     * Alert admins when system error is logged
     */
    async notifySystemErrorLogged(errorType, module, occurrenceCount, errorDetails) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.SYSTEM_ERROR_LOGGED;
        const message = template.messageTemplate({
            errorType,
            module,
            occurrenceCount,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.SYSTEM_ERROR_LOGGED,
            title: template.title,
            message,
            metadata: {
                errorType,
                module,
                occurrenceCount,
                errorDetails,
                timestamp: new Date(),
                actionUrl: "/admin/logs",
            },
            priority: occurrenceCount > 5 ? "HIGH" : "MEDIUM",
        });
    }
    /**
     * Alert admins of suspicious activity
     */
    async notifySuspiciousActivityDetected(activityType, userId, ipAddress, details) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return;
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const activityTime = new Date().toLocaleString();
        const template = notification_templates_1.AdminNotificationTemplates.SUSPICIOUS_ACTIVITY_DETECTED;
        const message = template.messageTemplate({
            activityType,
            userName: user.name,
            activityTime,
            ipAddress,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.SUSPICIOUS_ACTIVITY_DETECTED,
            title: template.title,
            message,
            metadata: {
                activityType,
                userId,
                userName: user.name,
                ipAddress,
                details,
                timestamp: new Date(),
                actionUrl: `/admin/security/activity?userId=${userId}`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify admins when database backup is completed
     */
    async notifyDatabaseBackupCompleted(backupId, backupSize, duration, status) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.DATABASE_BACKUP_COMPLETED;
        const message = template.messageTemplate({
            backupSize: (backupSize / 1024 / 1024 / 1024).toFixed(2), // Convert to GB
            duration,
            backupId,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.DATABASE_BACKUP_COMPLETED,
            title: template.title,
            message,
            metadata: {
                backupId,
                backupSize,
                duration,
                status,
                timestamp: new Date(),
                actionUrl: "/admin/maintenance/backups",
            },
            priority: "LOW",
        });
    }
    /**
     * Alert admins of security threats
     */
    async notifySecurityAlert(alertType, severity, affectedCount, actionRequired) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.SECURITY_ALERT;
        const message = template.messageTemplate({
            alertType,
            severity,
            affectedCount,
            actionRequired,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.SECURITY_ALERT,
            title: template.title,
            message,
            metadata: {
                alertType,
                severity,
                affectedCount,
                actionRequired,
                timestamp: new Date(),
                actionUrl: "/admin/security/alerts",
            },
            priority: severity === "CRITICAL" ? "HIGH" : "MEDIUM",
        });
    }
    /**
     * Notify admins when user account requires approval
     */
    async notifyUserApprovalRequired(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return;
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const submittedDate = user.createdAt.toLocaleDateString();
        const template = notification_templates_1.AdminNotificationTemplates.USER_APPROVAL_REQUIRED;
        const message = template.messageTemplate({
            role: user.role,
            userName: user.name,
            submittedDate,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.USER_APPROVAL_REQUIRED,
            title: template.title,
            message,
            metadata: {
                userId,
                role: user.role,
                username: user.username,
                submittedDate,
                actionUrl: `/admin/approvals?userId=${userId}`,
            },
            priority: "HIGH",
        });
    }
    /**
     * Notify admins about critical system events
     */
    async notifyCriticalSystemEvent(eventType, description, severity) {
        // Get all admin users
        const admins = await prisma.user.findMany({
            where: { role: "ADMIN" },
        });
        const template = notification_templates_1.AdminNotificationTemplates.SYSTEM_ALERT;
        const message = template.messageTemplate({
            message: `${eventType}: ${description}`,
        });
        await notification_service_1.notificationService.createBulkNotifications(admins.map((a) => a.id), {
            type: notification_types_1.NotificationType.SYSTEM_ALERT,
            title: `${severity} - ${eventType}`,
            message,
            metadata: {
                eventType,
                description,
                severity,
                timestamp: new Date(),
                actionUrl: "/admin/system/events",
            },
            priority: severity === "CRITICAL" ? "HIGH" : "MEDIUM",
        });
    }
}
exports.AdminNotificationHandler = AdminNotificationHandler;
exports.adminNotificationHandler = new AdminNotificationHandler();
