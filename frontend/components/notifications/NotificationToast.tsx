"use client";

import { useCallback, useEffect, memo } from "react";
import clsx from "clsx";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number; // ms, 0 = no auto-dismiss
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationToastProps {
  notifications: ToastNotification[];
  onDismiss: (id: string) => void;
}

/**
 * Individual Toast Item Component (Memoized)
 * Only re-renders when notification data changes
 */
const ToastItem = memo(function ToastItem({
  notification,
  onDismiss,
  getIcon,
  getBackgroundColor,
  getTextColor,
}: {
  notification: ToastNotification;
  onDismiss: (id: string) => void;
  getIcon: (type: string) => React.ReactNode;
  getBackgroundColor: (type: string) => string;
  getTextColor: (type: string) => string;
}) {
  useEffect(() => {
    const duration = notification.duration ?? 5000;

    if (duration <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onDismiss]);

  return (
    <motion.div
      key={notification.id}
      initial={{ opacity: 0, y: -20, x: 400 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 400 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "pointer-events-auto rounded-lg border p-4 shadow-lg",
        getBackgroundColor(notification.type)
      )}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 pt-0.5">{getIcon(notification.type)}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={clsx(
              "font-semibold text-sm",
              getTextColor(notification.type)
            )}
          >
            {notification.title}
          </h3>
          <p
            className={clsx(
              "text-sm mt-1 opacity-90",
              getTextColor(notification.type)
            )}
          >
            {notification.message}
          </p>

          {/* Action Button */}
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className={clsx(
                "text-xs font-medium mt-2 underline opacity-75 hover:opacity-100 transition",
                getTextColor(notification.type)
              )}
            >
              {notification.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(notification.id)}
          className={clsx(
            "flex-shrink-0 opacity-50 hover:opacity-100 transition",
            getTextColor(notification.type)
          )}
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
});

ToastItem.displayName = "ToastItem";

/**
 * Notification Toast Container Component (Memoized)
 * Displays temporary toast notifications
 */
function NotificationToastComponent({
  notifications,
  onDismiss,
}: NotificationToastProps) {
  const getIcon = useCallback((type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="text-green-600" />;
      case "error":
        return <AlertCircle size={20} className="text-red-600" />;
      case "warning":
        return <AlertCircle size={20} className="text-yellow-600" />;
      case "info":
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  }, []);

  const getBackgroundColor = useCallback((type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
    }
  }, []);

  const getTextColor = useCallback((type: string) => {
    switch (type) {
      case "success":
        return "text-green-900 dark:text-green-100";
      case "error":
        return "text-red-900 dark:text-red-100";
      case "warning":
        return "text-yellow-900 dark:text-yellow-100";
      case "info":
      default:
        return "text-blue-900 dark:text-blue-100";
    }
  }, []);

  return (
    <div className="pointer-events-none fixed top-20 right-3 z-[100] flex max-w-[min(24rem,calc(100vw-1.5rem))] flex-col gap-3 sm:top-4 sm:right-4">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <ToastItem
            key={notification.id}
            notification={notification}
            onDismiss={onDismiss}
            getIcon={getIcon}
            getBackgroundColor={getBackgroundColor}
            getTextColor={getTextColor}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

NotificationToastComponent.displayName = "NotificationToast";

export default memo(NotificationToastComponent);
