"use client";

import { memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Bell, AlertCircle } from "lucide-react";
import { getSystemSettings, updateNotificationSettings } from "@/services/admin_service";

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  optionsCount: number;
  backendKey: string;
}

function AdminNotificationSettings() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: "inapp",
      name: "In-App Notifications",
      icon: <MessageSquare size={20} />,
      description: "Get notifications within the platform",
      enabled: true,
      optionsCount: 5,
      backendKey: "inAppNotifications",
    },
    {
      id: "dashboard",
      name: "Dashboard Alerts",
      icon: <Bell size={20} />,
      description: "See critical alerts on your dashboard",
      enabled: true,
      optionsCount: 4,
      backendKey: "dashboardAlerts",
    },
    {
      id: "critical",
      name: "Critical System Alerts",
      icon: <AlertCircle size={20} />,
      description: "Immediate alerts for system issues and violations",
      enabled: true,
      optionsCount: 3,
      backendKey: "criticalSystemAlerts",
    },
  ]);

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSystemSettings();
        if (data.data) {
          const systemSettings = data.data;
          setChannels((prev) =>
            prev.map((channel) => ({
              ...channel,
              enabled: systemSettings[channel.backendKey] || channel.enabled,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load notification settings");
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
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = channels.reduce((acc, channel) => {
        acc[channel.backendKey] = channel.enabled;
        return acc;
      }, {} as Record<string, any>);

      await updateNotificationSettings(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
      console.error("Failed to save settings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="rounded-lg p-6 border border-border/50 bg-card">
        <div className="text-center text-muted-foreground">Loading notification settings...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
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
                    {channel.description} • {channel.optionsCount} alert types
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

      {/* Info Box */}
      <div className="rounded-lg p-4 bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Alert Priority:</strong> System alerts are shown immediately. Administrative notifications are batched during business hours. Critical security alerts bypass this schedule.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg p-3 bg-red-50 text-red-700 border border-red-200 text-sm">
          ✗ {error}
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
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save Notification Settings"}
      </button>
    </div>
  );
}

export default memo(AdminNotificationSettings);
