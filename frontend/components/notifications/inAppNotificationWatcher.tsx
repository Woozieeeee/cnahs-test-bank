"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useAuth from "@/hooks/auth/useAuth";
import { useNotification } from "@/components/providers/notificationProvider";
import { getNotifications } from "@/services/notification_service";

const POLL_INTERVAL_MS = 30_000;
const TOAST_DURATION_MS = 6_000;

const PUBLIC_PATHS = new Set(["/login", "/register"]);

function mapToastType(
  type: string,
  priority?: string,
): "success" | "error" | "warning" | "info" {
  if (
    type.includes("VIOLATION") ||
    type.includes("ALERT") ||
    type.includes("FLAGGED") ||
    priority === "HIGH"
  ) {
    return "warning";
  }

  if (
    type.includes("RESULT") ||
    type.includes("COMPLETED") ||
    type.includes("APPROVED")
  ) {
    return "success";
  }

  if (type.includes("ERROR")) {
    return "error";
  }

  return "info";
}

export default function InAppNotificationWatcher() {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const { addNotification } = useNotification();
  const seenIdsRef = useRef<Set<number>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (loading || !isAuthenticated || PUBLIC_PATHS.has(pathname)) {
      seenIdsRef.current = new Set();
      initializedRef.current = false;
      return;
    }

    const checkForNewNotifications = async () => {
      try {
        const { notifications } = await getNotifications(15, 0);

        if (!initializedRef.current) {
          notifications.forEach((notification) => {
            seenIdsRef.current.add(notification.id);
          });
          initializedRef.current = true;
          return;
        }

        const newNotifications = notifications.filter(
          (notification) =>
            !seenIdsRef.current.has(notification.id) && !notification.read,
        );

        for (const notification of newNotifications) {
          seenIdsRef.current.add(notification.id);

          const priority = notification.metadata?.priority as string | undefined;
          const actionUrl = notification.metadata?.actionUrl as
            | string
            | undefined;

          addNotification({
            title: notification.title,
            message: notification.message,
            type: mapToastType(notification.type, priority),
            duration: TOAST_DURATION_MS,
            action: actionUrl
              ? {
                  label: "View",
                  onClick: () => {
                    window.location.href = actionUrl;
                  },
                }
              : undefined,
          });
        }
      } catch {
        // Ignore polling errors (e.g. logged out mid-session)
      }
    };

    checkForNewNotifications();

    const interval = setInterval(
      checkForNewNotifications,
      POLL_INTERVAL_MS,
    );

    return () => clearInterval(interval);
  }, [isAuthenticated, loading, pathname, addNotification]);

  return null;
}
