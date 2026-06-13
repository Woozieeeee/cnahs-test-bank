/**
 * Notification Service
 * Handles all API calls for notification operations
 */

import api from "@/lib/axios";

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  unread: number;
}

/**
 * Fetch user's notifications
 */
export const getNotifications = async (
  limit: number = 20,
  offset: number = 0
): Promise<NotificationResponse> => {
  const response = await api.get("/notifications", {
    params: { limit, offset },
  });
  return response.data;
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (): Promise<number> => {
  const response = await api.get("/notifications/unread/count");
  return response.data.count;
};

/**
 * Mark single notification as read
 */
export const markNotificationAsRead = async (
  notificationId: number
): Promise<Notification> => {
  const response = await api.patch(
    `/notifications/${notificationId}/read`
  );
  return response.data;
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (): Promise<{
  count: number;
}> => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

/**
 * Delete notification
 */
export const deleteNotification = async (
  notificationId: number
): Promise<void> => {
  await api.delete(`/notifications/${notificationId}`);
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = async (): Promise<{
  count: number;
}> => {
  const response = await api.delete("/notifications/clear-all");
  return response.data;
};

/**
 * Get notifications by type
 */
export const getNotificationsByType = async (
  type: string,
  limit: number = 20,
  offset: number = 0
): Promise<NotificationResponse> => {
  const response = await api.get(`/notifications/type/${type}`, {
    params: { limit, offset },
  });
  return response.data;
};

/**
 * Get notification by ID
 */
export const getNotificationById = async (
  notificationId: number
): Promise<Notification> => {
  const response = await api.get(`/notifications/${notificationId}`);
  return response.data;
};
