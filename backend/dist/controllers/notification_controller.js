"use strict";
/**
 * Notification Controller
 * Handles notification-related HTTP requests
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllNotificationsController = exports.deleteNotificationController = exports.markAllNotificationsAsReadController = exports.markNotificationAsReadController = exports.getUnreadCountController = exports.getNotificationsController = void 0;
const notification_service_1 = require("../services/notification/notification_service");
/**
 * Get user notifications with pagination
 */
const getNotificationsController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const limit = parseInt(req.query.limit) || 20;
        const offset = parseInt(req.query.offset) || 0;
        const notifications = await notification_service_1.notificationService.getUserNotifications(userId, limit, offset);
        const total = notifications.length;
        const unreadCount = await notification_service_1.notificationService.getUnreadCount(userId);
        res.json({
            notifications,
            total,
            unread: unreadCount,
        });
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};
exports.getNotificationsController = getNotificationsController;
/**
 * Get unread notification count
 */
const getUnreadCountController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const count = await notification_service_1.notificationService.getUnreadCount(userId);
        res.json({ count });
    }
    catch (error) {
        console.error("Error fetching unread count:", error);
        res.status(500).json({ error: "Failed to fetch unread count" });
    }
};
exports.getUnreadCountController = getUnreadCountController;
/**
 * Mark single notification as read
 */
const markNotificationAsReadController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const notificationId = req.params.notificationId;
        const id = Array.isArray(notificationId) ? notificationId[0] : notificationId;
        const parsedId = parseInt(id, 10);
        if (Number.isNaN(parsedId)) {
            res.status(400).json({ error: "Invalid notification ID" });
            return;
        }
        const notification = await notification_service_1.notificationService.markAsRead(parsedId, userId);
        res.json(notification);
    }
    catch (error) {
        console.error("Error marking notification as read:", error);
        if (error.message === "Notification not found") {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
};
exports.markNotificationAsReadController = markNotificationAsReadController;
/**
 * Mark all notifications as read
 */
const markAllNotificationsAsReadController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const result = await notification_service_1.notificationService.markAllAsRead(userId);
        res.json(result);
    }
    catch (error) {
        console.error("Error marking all notifications as read:", error);
        res
            .status(500)
            .json({ error: "Failed to mark all notifications as read" });
    }
};
exports.markAllNotificationsAsReadController = markAllNotificationsAsReadController;
/**
 * Delete notification
 */
const deleteNotificationController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const notificationId = req.params.notificationId;
        const id = Array.isArray(notificationId) ? notificationId[0] : notificationId;
        const parsedId = parseInt(id, 10);
        if (Number.isNaN(parsedId)) {
            res.status(400).json({ error: "Invalid notification ID" });
            return;
        }
        await notification_service_1.notificationService.deleteNotification(parsedId, userId);
        res.json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting notification:", error);
        if (error.message === "Notification not found") {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Failed to delete notification" });
    }
};
exports.deleteNotificationController = deleteNotificationController;
/**
 * Clear all notifications for the current user
 */
const clearAllNotificationsController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const result = await notification_service_1.notificationService.clearAllForUser(userId);
        res.json({ message: "All notifications cleared", count: result.count });
    }
    catch (error) {
        console.error("Error clearing notifications:", error);
        res.status(500).json({ error: "Failed to clear notifications" });
    }
};
exports.clearAllNotificationsController = clearAllNotificationsController;
