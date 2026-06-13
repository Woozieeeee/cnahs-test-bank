/**
 * useNotifications Hook
 * Manages notification state and operations
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Notification,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
} from "@/services/notification_service";
import useAuth from "@/hooks/auth/useAuth";
import {
  getRequestErrorMessage,
  isTransientRequestError,
} from "@/lib/requestError";

interface UseNotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

export const useNotifications = (autoFetch: boolean = true) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [state, setState] = useState<UseNotificationsState>({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    hasMore: true,
  });

  const offsetRef = useRef(0);
  const LIMIT = 20;

  const handleFetchError = useCallback(
    (error: unknown, options?: { silent?: boolean }) => {
      if (options?.silent || isTransientRequestError(error)) {
        return;
      }

      setState((prev) => ({
        ...prev,
        error: getRequestErrorMessage(error),
      }));
    },
    []
  );

  /**
   * Fetch notifications
   */
  const fetchNotifications = useCallback(
    async (reset: boolean = false, options?: { silent?: boolean }) => {
      if (!isAuthenticated) return;

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const currentOffset = reset ? 0 : offsetRef.current;
        const response = await getNotifications(LIMIT, currentOffset);

        offsetRef.current = reset ? LIMIT : currentOffset + LIMIT;

        setState((prev) => ({
          ...prev,
          notifications: reset
            ? response.notifications
            : [...prev.notifications, ...response.notifications],
          unreadCount: response.unread,
          hasMore: response.notifications.length === LIMIT,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false }));
        handleFetchError(error, options);
      }
    },
    [handleFetchError, isAuthenticated]
  );

  /**
   * Fetch unread count
   */
  const fetchUnreadCount = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!isAuthenticated) return;

      try {
        const count = await getUnreadCount();
        setState((prev) => ({ ...prev, unreadCount: count }));
      } catch (error) {
        handleFetchError(error, options);
      }
    },
    [handleFetchError, isAuthenticated]
  );

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId);

      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
    } catch (error) {
      if (!isTransientRequestError(error)) {
        console.error("Failed to mark notification as read:", error);
      }
    }
  }, []);

  /**
   * Mark all as read
   */
  const markAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead();

      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      if (!isTransientRequestError(error)) {
        console.error("Failed to mark all as read:", error);
      }
    }
  }, []);

  /**
   * Delete notification
   */
  const remove = useCallback(async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);

      setState((prev) => {
        const wasUnread = !prev.notifications.find(
          (n) => n.id === notificationId
        )?.read;

        return {
          ...prev,
          notifications: prev.notifications.filter((n) => n.id !== notificationId),
          unreadCount: wasUnread ? Math.max(0, prev.unreadCount - 1) : prev.unreadCount,
        };
      });
    } catch (error) {
      if (!isTransientRequestError(error)) {
        console.error("Failed to delete notification:", error);
      }
    }
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(async () => {
    try {
      await clearAllNotifications();

      setState((prev) => ({
        ...prev,
        notifications: [],
        unreadCount: 0,
      }));
    } catch (error) {
      if (!isTransientRequestError(error)) {
        console.error("Failed to clear notifications:", error);
      }
    }
  }, []);

  /**
   * Load more notifications
   */
  const loadMore = useCallback(async () => {
    if (state.hasMore && !state.isLoading) {
      await fetchNotifications(false);
    }
  }, [state.hasMore, state.isLoading, fetchNotifications]);

  /**
   * Refresh notifications
   */
  const refresh = useCallback(async () => {
    await fetchNotifications(true);
    await fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  /**
   * Auto-fetch on mount and polling
   */
  useEffect(() => {
    if (!autoFetch || authLoading) return;

    if (!isAuthenticated) {
      offsetRef.current = 0;
      setState({
        notifications: [],
        unreadCount: 0,
        isLoading: false,
        error: null,
        hasMore: true,
      });
      return;
    }

    fetchNotifications(true);
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchUnreadCount({ silent: true });
    }, 30000);

    return () => clearInterval(interval);
  }, [
    autoFetch,
    authLoading,
    isAuthenticated,
    fetchNotifications,
    fetchUnreadCount,
  ]);

  return {
    ...state,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    remove,
    clearAll,
    loadMore,
    refresh,
  };
};
