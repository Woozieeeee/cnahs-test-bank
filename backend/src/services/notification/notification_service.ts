/**
 * Notification Service
 * Handles creation and delivery of notifications for all roles
 */

import { PrismaClient, Notification } from "@prisma/client";
import { NotificationPayload } from "./notification_types";
import {
  filterDeliverableUserIds,
  shouldDeliverNotification,
} from "./notification_preferences_service";

const prisma = new PrismaClient();

export class NotificationService {
  /**
   * Create notification for a single user
   */
  async createNotification(
    userId: number,
    payload: NotificationPayload,
  ): Promise<Notification | null> {
    const allowed = await shouldDeliverNotification(
      userId,
      payload.type,
      payload.priority,
    );

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
  async createBulkNotifications(
    userIds: number[],
    payload: NotificationPayload,
  ): Promise<Notification[]> {
    const deliverableUserIds = await filterDeliverableUserIds(
      userIds,
      payload.type,
      payload.priority,
    );

    if (deliverableUserIds.length === 0) {
      return [];
    }

    const notifications = await Promise.all(
      deliverableUserIds.map((userId) => this.createNotification(userId, payload)),
    );

    return notifications.filter(
      (notification): notification is Notification => notification !== null,
    );
  }

  /**
   * Get notifications for a user
   */
  async getUserNotifications(
    userId: number,
    limit: number = 20,
    offset: number = 0
  ): Promise<Notification[]> {
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
  async getUnreadCount(userId: number): Promise<number> {
    return await prisma.notification.count({
      where: { userId, read: false },
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(
    notificationId: number,
    userId: number,
  ): Promise<Notification> {
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
  async markAllAsRead(userId: number): Promise<{ count: number }> {
    return await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  /**
   * Delete notification
   */
  async deleteNotification(
    notificationId: number,
    userId: number,
  ): Promise<void> {
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
  async clearAllForUser(userId: number): Promise<{ count: number }> {
    return await prisma.notification.deleteMany({
      where: { userId },
    });
  }

  /**
   * Clear old notifications (older than 30 days)
   */
  async clearOldNotifications(): Promise<void> {
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

export const notificationService = new NotificationService();
