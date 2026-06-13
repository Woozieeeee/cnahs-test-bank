"use client";

import { AuthProvider } from "@/contexts/authContext";
import TokenExpirationHandler from "@/components/common/tokenExpirationHandler";
import InAppNotificationWatcher from "@/components/notifications/inAppNotificationWatcher";
import { NotificationProvider } from "@/components/providers/notificationProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TokenExpirationHandler />
        <InAppNotificationWatcher />
        {children}
      </NotificationProvider>
    </AuthProvider>
  );
}
