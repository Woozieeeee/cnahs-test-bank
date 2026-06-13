"use client";

import { memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bell, Eye, Shield, Timer } from "lucide-react";
import { getFacultyExamPreferences, updateFacultyExamPreferences } from "@/services/faculty_service";

interface ExamPreference {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

function FacultyExamPreferences() {
  const [preferences, setPreferences] = useState<ExamPreference[]>([
    {
      id: "exam-notifications",
      label: "Exam Activity Notifications",
      description: "Receive alerts when students start, submit, or violate exam rules",
      icon: <Bell size={18} />,
      enabled: true,
    },
    {
      id: "violation-alerts",
      label: "Real-time Violation Alerts",
      description: "Get notified immediately when potential cheating is detected",
      icon: <Shield size={18} />,
      enabled: true,
    },
    {
      id: "auto-submit-notification",
      label: "Auto-Submit Notifications",
      description: "Notify when exams are auto-submitted due to violations or time limit",
      icon: <Timer size={18} />,
      enabled: true,
    },
    {
      id: "student-progress",
      label: "Student Progress Updates",
      description: "Receive weekly summaries of student exam performance and progress",
      icon: <Eye size={18} />,
      enabled: false,
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        const response = await getFacultyExamPreferences();
        
        // Map backend response to frontend state
        setPreferences([
          {
            id: "exam-notifications",
            label: "Exam Activity Notifications",
            description: "Receive alerts when students start, submit, or violate exam rules",
            icon: <Bell size={18} />,
            enabled: response.data?.examNotifications ?? true,
          },
          {
            id: "violation-alerts",
            label: "Real-time Violation Alerts",
            description: "Get notified immediately when potential cheating is detected",
            icon: <Shield size={18} />,
            enabled: response.data?.violationAlerts ?? true,
          },
          {
            id: "auto-submit-notification",
            label: "Auto-Submit Notifications",
            description: "Notify when exams are auto-submitted due to violations or time limit",
            icon: <Timer size={18} />,
            enabled: response.data?.autoSubmitNotification ?? true,
          },
          {
            id: "student-progress",
            label: "Student Progress Updates",
            description: "Receive weekly summaries of student exam performance and progress",
            icon: <Eye size={18} />,
            enabled: response.data?.studentProgressUpdates ?? false,
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load preferences");
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleToggle = (id: string) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
    setSaved(false);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await updateFacultyExamPreferences({
        examNotifications: preferences.find((p) => p.id === "exam-notifications")?.enabled,
        violationAlerts: preferences.find((p) => p.id === "violation-alerts")?.enabled,
        autoSubmitNotification: preferences.find((p) => p.id === "auto-submit-notification")?.enabled,
        studentProgressUpdates: preferences.find((p) => p.id === "student-progress")?.enabled,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <Card className="rounded-lg p-6 border border-border/50 bg-card">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading preferences...</div>
          </div>
        </Card>
      ) : (
        <Card className="rounded-lg p-6 border border-border/50 bg-card">
          <div className="space-y-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-muted/50 transition"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mt-1">
                    {pref.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{pref.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pref.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pref.enabled}
                    onChange={() => handleToggle(pref.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg p-3 bg-red-50 text-red-700 border border-red-200 text-sm">
          ✕ {error}
        </div>
      )}

      {/* Save Message */}
      {saved && (
        <div className="rounded-lg p-3 bg-green-50 text-green-700 border border-green-200 text-sm">
          ✓ Preferences saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading || saving}
        className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {saving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
}

export default memo(FacultyExamPreferences);
