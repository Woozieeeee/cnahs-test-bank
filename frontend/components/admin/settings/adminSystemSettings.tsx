"use client";

import { memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Database, Clock, Shield, Users } from "lucide-react";
import { getSystemSettings, updateSystemSettings } from "@/services/admin_service";

interface SystemSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  value: string | number;
  type: "text" | "number" | "select";
  backendKey: string;
  options?: { value: string; label: string }[];
}

function AdminSystemSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>([
    {
      id: "session-timeout",
      label: "Session Timeout (hours)",
      description: "How long before user sessions expire due to inactivity",
      icon: <Clock size={18} />,
      value: 24,
      type: "number",
      backendKey: "sessionTimeoutHours",
    },
    {
      id: "max-login-attempts",
      label: "Max Login Attempts",
      description: "Number of failed login attempts before account lockout",
      icon: <Shield size={18} />,
      value: 5,
      type: "number",
      backendKey: "maxLoginAttempts",
    },
    {
      id: "data-retention",
      label: "Data Retention Period (days)",
      description: "How long to keep deleted/archived records before permanent removal",
      icon: <Database size={18} />,
      value: 90,
      type: "number",
      backendKey: "dataRetentionDays",
    },
    {
      id: "max-concurrent-users",
      label: "Max Concurrent Users",
      description: "Maximum number of users that can be logged in simultaneously",
      icon: <Users size={18} />,
      value: 1000,
      type: "number",
      backendKey: "maxConcurrentUsers",
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
          setSettings((prev) =>
            prev.map((setting) => ({
              ...setting,
              value: systemSettings[setting.backendKey] || setting.value,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load system settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (id: string, value: string | number) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = settings.reduce((acc, setting) => {
        acc[setting.backendKey] = setting.value;
        return acc;
      }, {} as Record<string, any>);

      await updateSystemSettings(payload);
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
        <div className="text-center text-muted-foreground">Loading settings...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-lg p-6 border border-border/50 bg-card">
        <div className="space-y-6">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start gap-4 pb-6 border-b border-border/30 last:border-b-0 last:pb-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 flex-shrink-0 mt-1">
                {setting.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{setting.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{setting.description}</p>

                {/* Input Field */}
                <div className="mt-3">
                  {setting.type === "number" ? (
                    <input
                      type="number"
                      value={setting.value}
                      onChange={(e) =>
                        handleChange(setting.id, parseInt(e.target.value) || 0)
                      }
                      className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  ) : setting.type === "select" ? (
                    <select
                      value={setting.value}
                      onChange={(e) => handleChange(setting.id, e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {setting.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => handleChange(setting.id, e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Warning Box */}
      <div className="rounded-lg p-4 bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-900">
          <strong>⚠️ Caution:</strong> Changing these system-wide settings affects all users. Make changes carefully and test thoroughly before deploying to production.
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
          ✓ System settings saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save System Settings"}
      </button>
    </div>
  );
}

export default memo(AdminSystemSettings);
