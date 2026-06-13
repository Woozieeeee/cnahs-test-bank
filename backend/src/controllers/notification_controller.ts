/**
 * Notification Controller
 * Handles notification-related HTTP requests
 */

import { Request, Response } from "express";
import { notificationService } from "../services/notification/notification_service";

/**
 * Get user notifications with pagination
 */
export const getNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const notifications = await notificationService.getUserNotifications(
      userId,
      limit,
      offset
    );

    const total = notifications.length;
    const unreadCount = await notificationService.getUnreadCount(userId);

    res.json({
      notifications,
      total,
      unread: unreadCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const count = await notificationService.getUnreadCount(userId);
    res.json({ count });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({ error: "Failed to fetch unread count" });
  }
};

/**
 * Mark single notification as read
 */
export const markNotificationAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

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

    const notification = await notificationService.markAsRead(parsedId, userId);
    res.json(notification);
  } catch (error: any) {
    console.error("Error marking notification as read:", error);

    if (error.message === "Notification not found") {
      res.status(404).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await notificationService.markAllAsRead(userId);
    res.json(result);
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res
      .status(500)
      .json({ error: "Failed to mark all notifications as read" });
  }
};

/**
 * Delete notification
 */
export const deleteNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

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

    await notificationService.deleteNotification(parsedId, userId);
    res.json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting notification:", error);

    if (error.message === "Notification not found") {
      res.status(404).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Failed to delete notification" });
  }
};

/**
 * Clear all notifications for the current user
 */
export const clearAllNotificationsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await notificationService.clearAllForUser(userId);
    res.json({ message: "All notifications cleared", count: result.count });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    res.status(500).json({ error: "Failed to clear notifications" });
  }
};
