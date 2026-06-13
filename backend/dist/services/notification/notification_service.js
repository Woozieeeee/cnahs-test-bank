"use strict";
/**
 * Notification Service
 * Handles creation and delivery of notifications for all roles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const client_1 = require("@prisma/client");
const notification_preferences_service_1 = require("./notification_preferences_service");
const prisma = new client_1.PrismaClient();
class NotificationService {
    /**
     * Create notification for a single user
     */
    async createNotification(userId, payload) {
        const allowed = await (0, notification_preferences_service_1.shouldDeliverNotification)(userId, payload.type, payload.priority);
        if (!allowed) {
            return null;
        }
        return await prisma.notification.create({
            data: {
                userId,
                type: payload.type,
                title: payload.title,
                message: payload.message,
                metadata: payload.metadata || {},
            },
        });
    }
    /**
     * Create notifications for multiple users
     */
    async createBulkNotifications(userIds, payload) {
        const deliverableUserIds = await (0, notification_preferences_service_1.filterDeliverableUserIds)(userIds, payload.type, payload.priority);
        if (deliverableUserIds.length === 0) {
            return [];
        }
        const notifications = await Promise.all(deliverableUserIds.map((userId) => this.createNotification(userId, payload)));
        return notifications.filter((notification) => notification !== null);
    }
    /**
     * Get notifications for a user
     */
    async getUserNotifications(userId, limit = 20, offset = 0) {
        return await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: offset,
        });
    }
    /**
     * Get unread notifications count
     */
    async getUnreadCount(userId) {
        return await prisma.notification.count({
            where: { userId, read: false },
        });
    }
    /**
     * Mark notification as read
     */
    async markAsRead(notificationId, userId) {
        const notification = await prisma.notification.findFirst({
            where: { id: notificationId, userId },
        });
        if (!notification) {
            throw new Error("Notification not found");
        }
        return await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
    }
    /**
     * Mark all notifications as read
     */
    async markAllAsRead(userId) {
        return await prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
    }
    /**
     * Delete notification
     */
    async deleteNotification(notificationId, userId) {
        const notification = await prisma.notification.findFirst({
            where: { id: notificationId, userId },
        });
        if (!notification) {
            throw new Error("Notification not found");
        }
        await prisma.notification.delete({
            where: { id: notificationId },
        });
    }
    /**
     * Delete all notifications for a user
     */
    async clearAllForUser(userId) {
        return await prisma.notification.deleteMany({
            where: { userId },
        });
    }
    /**
     * Clear old notifications (older than 30 days)
     */
    async clearOldNotifications() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        await prisma.notification.deleteMany({
            where: {
                createdAt: {
                    lt: thirtyDaysAgo,
                },
            },
        });
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
