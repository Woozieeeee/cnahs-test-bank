"use client";

import { memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Bell } from "lucide-react";
import { getFacultyNotificationSettings, updateFacultyNotificationSettings } from "@/services/faculty_service";

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  optionsCount: number;
}

function FacultyNotificationSettings() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: "inapp",
      name: "In-App Notifications",
      icon: <MessageSquare size={20} />,
      description: "Get notifications within the platform",
      enabled: true,
      optionsCount: 4,
    },
    {
      id: "dashboard",
      name: "Dashboard Alerts",
      icon: <Bell size={20} />,
      description: "See important alerts on your dashboard",
      enabled: true,
      optionsCount: 3,
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await getFacultyNotificationSettings();
        
        // Map backend response to frontend state
        setChannels([
          {
            id: "inapp",
            name: "In-App Notifications",
            icon: <MessageSquare size={20} />,
            description: "Get notifications within the platform",
            enabled: response.data?.inAppNotifications ?? true,
            optionsCount: 4,
          },
          {
            id: "dashboard",
            name: "Dashboard Alerts",
            icon: <Bell size={20} />,
            description: "See important alerts on your dashboard",
            enabled: response.data?.dashboardAlerts ?? true,
            optionsCount: 3,
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notification settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (id: string) => {
    setChannels(
      channels.map((channel) =>
        channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
      )
    );
    setSaved(false);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await updateFacultyNotificationSettings({
        inAppNotifications: channels.find((c) => c.id === "inapp")?.enabled,
        dashboardAlerts: channels.find((c) => c.id === "dashboard")?.enabled,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save notification settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <Card className="rounded-lg p-6 border border-border/50 bg-card">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading settings...</div>
          </div>
        </Card>
      ) : (
        <Card className="rounded-lg p-6 border border-border/50 bg-card">
          <div className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-ring transition"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    {channel.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{channel.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {channel.description} • {channel.optionsCount} notification types
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channel.enabled}
                    onChange={() => handleToggle(channel.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Info Box */}
      <div className="rounded-lg p-4 bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Notification Display:</strong> Critical alerts are shown immediately on your dashboard and in-app. Other notifications are available in your notification center.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg p-3 bg-red-50 text-red-700 border border-red-200 text-sm">
          ✕ {error}
        </div>
      )}

      {/* Save Message */}
      {saved && (
        <div className="rounded-lg p-3 bg-green-50 text-green-700 border border-green-200 text-sm">
          ✓ Notification settings saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading || saving}
        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {saving ? "Saving..." : "Save Notification Settings"}
      </button>
    </div>
  );
}

export default memo(FacultyNotificationSettings);
