"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { useNotifications } from "@/hooks/shared/useNotifications";
import { Notification } from "@/services/notification_service";
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertCircle,
  Search,
  Filter,
  Loader,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Format date to readable format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format relative time
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
 * Get notification priority badge color
 */
function getPriorityColor(priority: string) {
  switch (priority.toUpperCase()) {
    case "HIGH":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "LOW":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

/**
 * Get notification type badge color
 */
function getTypeColor(type: string) {
  if (type.includes("EXAM")) return "bg-purple-100 text-purple-800 dark:bg-purple-900";
  if (type.includes("RESULT") || type.includes("GRADE"))
    return "bg-green-100 text-green-800 dark:bg-green-900";
  if (type.includes("VIOLATION") || type.includes("ALERT"))
    return "bg-red-100 text-red-800 dark:bg-red-900";
  if (type.includes("PROGRESS") || type.includes("MILESTONE"))
    return "bg-blue-100 text-blue-800 dark:bg-blue-900";
  return "bg-gray-100 text-gray-800 dark:bg-gray-900";
}

export default function NotificationsPage() {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filterType === "all" ||
      notification.type.includes(filterType.toUpperCase());

    const matchesRead =
      filterRead === "all" ||
      (filterRead === "unread" && !notification.read) ||
      (filterRead === "read" && notification.read);

    return matchesSearch && matchesType && matchesRead;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50 px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={28} className="text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead()}
              className="gap-2"
            >
              <CheckCheck size={16} />
              Mark All as Read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
            </div>

            {/* Read Status Filter */}
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="text-sm rounded border border-input bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm rounded border border-input bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="exam">Exam</option>
              <option value="result">Results</option>
              <option value="violation">Violations</option>
              <option value="progress">Progress</option>
              <option value="alert">Alerts</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
              <Bell size={48} className="mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">
                {notifications.length === 0
                  ? "No notifications yet"
                  : "No notifications match your filters"}
              </p>
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                  onDelete={() => remove(notification.id)}
                />
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="pt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => loadMore()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="mr-2 animate-spin" size={16} />
                        Loading...
                      </>
                    ) : (
                      "Load More Notifications"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Notification Item Component (Memoized)
 * Only re-renders when notification data changes
 */
function NotificationItemComponent({
  notification,
  onRead,
  onDelete,
}: {
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
}) {
  const metadata = notification.metadata || {};
  const priority = metadata.priority || "MEDIUM";

  return (
    <div
      className={clsx(
        "rounded-lg border p-4 transition hover:shadow-md",
        notification.read
          ? "border-border bg-background"
          : "border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/30"
      )}
    >
      <div className="flex gap-4">
        {/* Unread Indicator */}
        <div className="flex-shrink-0 pt-1">
          {!notification.read && (
            <div className="h-3 w-3 rounded-full bg-blue-500" title="Unread" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-end flex-shrink-0">
              <span
                className={clsx(
                  "inline-block text-xs font-medium px-2.5 py-0.5 rounded",
                  getPriorityColor(priority)
                )}
              >
                {priority}
              </span>
              <span
                className={clsx(
                  "inline-block text-xs font-medium px-2.5 py-0.5 rounded",
                  getTypeColor(notification.type)
                )}
              >
                {notification.type}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-2 text-xs text-muted-foreground flex gap-4">
            <span>{formatDate(notification.createdAt)}</span>
            <span>({formatRelativeTime(notification.createdAt)})</span>
          </div>

          {/* Action URL */}
          {metadata.actionUrl && (
            <div className="mt-3">
              <a
                href={metadata.actionUrl}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                View Details →
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-start gap-2 flex-shrink-0">
          {!notification.read && (
            <button
              onClick={onRead}
              className="p-1.5 text-muted-foreground hover:text-foreground transition rounded hover:bg-muted"
              title="Mark as read"
            >
              <CheckCheck size={16} />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-1.5 text-muted-foreground hover:text-destructive transition rounded hover:bg-muted"
            title="Delete notification"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

NotificationItemComponent.displayName = "NotificationItem";

const NotificationItem = memo(NotificationItemComponent);
