/**
 * useToastNotifications Hook
 * Manages toast notification state
 */

"use client";

import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToastNotifications = () => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  /**
   * Add notification
   */
  const addNotification = useCallback(
    (notification: Omit<ToastNotification, "id">) => {
      const id = uuidv4();
      const newNotification: ToastNotification = {
        ...notification,
        id,
        duration: notification.duration ?? 6000,
      };

      setNotifications((prev) => [...prev, newNotification]);
      return id;
    },
    []
  );

  /**
   * Remove notification
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Success notification
   */
  const success = useCallback(
    (title: string, message: string, duration?: number) => {
      return addNotification({ title, message, type: "success", duration });
    },
    [addNotification]
  );

  /**
   * Error notification
   */
  const error = useCallback(
    (title: string, message: string, duration?: number) => {
      return addNotification({ title, message, type: "error", duration: duration ?? 0 });
    },
    [addNotification]
  );

  /**
   * Warning notification
   */
  const warning = useCallback(
    (title: string, message: string, duration?: number) => {
      return addNotification({ title, message, type: "warning", duration });
    },
    [addNotification]
  );

  /**
   * Info notification
   */
  const info = useCallback(
    (title: string, message: string, duration?: number) => {
      return addNotification({ title, message, type: "info", duration });
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };
};
