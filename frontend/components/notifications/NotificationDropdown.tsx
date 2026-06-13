"use client";

import { Bell, Trash2, CheckCheck, AlertCircle } from "lucide-react";
import { useCallback, useRef, useEffect, useState, memo } from "react";
import clsx from "clsx";
import { useNotifications } from "@/hooks/shared/useNotifications";
import { Notification } from "@/services/notification_service";
import { Button } from "@/components/ui/button";

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

/**
 * Notification Dropdown Component (Memoized)
 * Displays notifications in navbar
 */
function NotificationDropdownComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    isLoading,
    hasMore,
    markAsRead,
    markAllAsRead,
    remove,
    loadMore,
    refresh,
  } = useNotifications(true);

  /**
   * Get notification icon based on type
   */
  const getNotificationIcon = (type: string) => {
    if (type.includes("RESULT") || type.includes("COMPLETION")) {
      return "✓";
    }
    if (type.includes("ALERT") || type.includes("VIOLATION")) {
      return "!";
    }
    if (type.includes("MILESTONE") || type.includes("UNLOCK")) {
      return "★";
    }
    if (type.includes("REMINDER") || type.includes("SCHEDULED")) {
      return "📅";
    }
    return "📢";
  };

  /**
   * Get notification color based on priority and type
   */
  const getNotificationColor = (notification: Notification) => {
    const metadata = notification.metadata || {};
    const priority = metadata.priority || "MEDIUM";

    if (priority === "HIGH") return "bg-red-50 dark:bg-red-950";
    if (priority === "MEDIUM") return "bg-amber-50 dark:bg-amber-950";
    return "bg-blue-50 dark:bg-blue-950";
  };

  /**
   * Handle notification click
   */
  const handleNotificationClick = useCallback(
    (notification: Notification) => {
      if (!notification.read) {
        markAsRead(notification.id);
      }

      const metadata = notification.metadata || {};
      const actionUrl = metadata.actionUrl;

      if (actionUrl) {
        window.location.href = actionUrl;
      }
    },
    [markAsRead]
  );

  /**
   * Handle click outside to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "text-foreground hover:bg-muted relative rounded-full p-2 transition",
          isOpen && "bg-muted"
        )}
      >
        <Bell size={20} />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="animation-fade-in absolute right-0 top-12 z-50 w-[min(24rem,calc(100vw-1.5rem))] max-h-[min(24rem,70vh)] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1"
                  title="Mark all as read"
                >
                  <CheckCheck size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <Bell className="text-muted-foreground" size={32} />
                <p className="text-sm text-muted-foreground">
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={clsx(
                      "relative cursor-pointer border-l-4 p-3 transition hover:bg-muted/50",
                      notification.read
                        ? "border-l-transparent bg-transparent"
                        : "border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/30",
                      getNotificationColor(notification)
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="text-lg">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(notification.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-start gap-2">
                        {!notification.read && (
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(notification.id);
                          }}
                          className="text-muted-foreground hover:text-destructive transition"
                          title="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="mt-2 flex gap-2">
                      <span className="inline-block text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {notification.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && notifications.length > 0 && (
              <div className="border-t border-border p-3 text-center">
                <button
                  onClick={() => loadMore()}
                  disabled={isLoading}
                  className="text-xs text-blue-600 hover:text-blue-700 disabled:text-muted-foreground transition"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border bg-muted px-4 py-2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refresh()}
                className="flex-1 text-xs"
              >
                Refresh
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

NotificationDropdownComponent.displayName = "NotificationDropdown";

export default memo(NotificationDropdownComponent);
