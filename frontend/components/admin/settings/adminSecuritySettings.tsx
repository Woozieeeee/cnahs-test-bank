"use client";

import { memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Key, Lock, Eye } from "lucide-react";
import { getSystemSettings, updateSecurityPolicies } from "@/services/admin_service";

interface SecurityPolicy {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  backendKey: string;
}

function AdminSecuritySettings() {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([
    {
      id: "password-expiry",
      label: "Force Password Expiry",
      description: "Require password change every 90 days for all users",
      icon: <Key size={18} />,
      enabled: true,
      backendKey: "forcePasswordExpiry",
    },
    {
      id: "two-factor",
      label: "Two-Factor Authentication",
      description: "Require 2FA for admin and faculty accounts (optional for students)",
      icon: <Lock size={18} />,
      enabled: false,
      backendKey: "enableTwoFactor",
    },
    {
      id: "login-history",
      label: "Track Login History",
      description: "Log all user login attempts and locations",
      icon: <Eye size={18} />,
      enabled: true,
      backendKey: "trackLoginHistory",
    },
    {
      id: "ip-restriction",
      label: "IP Whitelist",
      description: "Restrict admin panel access to specific IP addresses",
      icon: <Lock size={18} />,
      enabled: false,
      backendKey: "enableIpWhitelist",
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
          setPolicies((prev) =>
            prev.map((policy) => ({
              ...policy,
              enabled: systemSettings[policy.backendKey] || policy.enabled,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Failed to load security policies");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (id: string) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
      )
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = policies.reduce((acc, policy) => {
        acc[policy.backendKey] = policy.enabled;
        return acc;
      }, {} as Record<string, any>);

      await updateSecurityPolicies(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save policies");
      console.error("Failed to save policies:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="rounded-lg p-6 border border-border/50 bg-card">
        <div className="text-center text-muted-foreground">Loading policies...</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-lg p-6 border border-border/50 bg-card">
        <div className="space-y-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 mt-1">
                  {policy.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{policy.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{policy.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={policy.enabled}
                  onChange={() => handleToggle(policy.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Info */}
      <div className="rounded-lg p-4 bg-red-50 border border-red-200">
        <p className="text-sm text-red-900">
          <strong>🔒 Security Notice:</strong> These policies apply to all users in the system. Stricter policies enhance security but may impact user experience.
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
          ✓ Security policies saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full rounded-lg bg-red-600 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save Security Policies"}
      </button>
    </div>
  );
}

export default memo(AdminSecuritySettings);
