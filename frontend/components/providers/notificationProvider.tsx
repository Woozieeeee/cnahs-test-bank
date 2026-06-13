"use client";

import React, { createContext, useContext } from "react";
import {
  useToastNotifications,
  ToastNotification,
} from "@/hooks/shared/useToastNotifications";
import NotificationToast from "@/components/notifications/NotificationToast";

interface NotificationContextType {
  addNotification: (
    notification: Omit<ToastNotification, "id">
  ) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (title: string, message: string, duration?: number) => string;
  error: (title: string, message: string, duration?: number) => string;
  warning: (title: string, message: string, duration?: number) => string;
  info: (title: string, message: string, duration?: number) => string;
}

const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  } = useToastNotifications();

  const value: NotificationContextType = {
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationToast
        notifications={notifications}
        onDismiss={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
