"use client";

import { memo } from "react";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import { useSettingsTab } from "@/hooks/useSettingsTab";
import ProfileSettings from "@/components/settings/profileSettings";
import FacultyChangePassword from "@/components/faculty/settings/facultyChangePassword";
import FacultyExamPreferences from "@/components/faculty/settings/facultyExamPreferences";
import FacultyNotificationSettings from "@/components/faculty/settings/facultyNotificationSettings";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, User, Lock, Sliders, Bell } from "lucide-react";

function FacultySettingsPageComponent() {
  const { user, loading: authLoading, isAuthenticated, setUser } =
    useProtectedRoute(["FACULTY"]);
  const [activeTab, setActiveTab] = useSettingsTab<
    "account" | "password" | "exam" | "notifications"
  >("account", ["account", "password", "exam", "notifications"]);

  if (authLoading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  const tabs = [
    {
      id: "account" as const,
      label: "Account",
      icon: User,
      description: "View and manage your account details",
    },
    {
      id: "password" as const,
      label: "Password",
      icon: Lock,
      description: "Update your security credentials",
    },
    {
      id: "exam" as const,
      label: "Exam Preferences",
      icon: Sliders,
      description: "Configure exam monitoring settings",
    },
    {
      id: "notifications" as const,
      label: "Notifications",
      icon: Bell,
      description: "Manage notification channels",
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          title="Settings"
          description={`Manage your account, security, and exam preferences, ${user?.name}`}
        />
      </PageHeader>

      {/* Security Information */}
      <div className="mt-8 mb-8">
        <Card className="rounded-lg p-6 border border-border/50 bg-blue-50/50">
          <div className="space-y-2 text-sm text-foreground">
            <p>
              <strong>🔒 Password Security:</strong> Keep your password strong and unique. Change it regularly for better security.
            </p>
            <p>
              <strong>📊 Session Management:</strong> Your session will expire after 24 hours of inactivity for security purposes.
            </p>
            <p>
              <strong>🛡️ Account Protection:</strong> Never share your login credentials with anyone. Your account is for your exclusive use.
            </p>
            <p>
              <strong>ℹ️ Data Privacy:</strong> Your exam settings and student monitoring data are stored securely. We comply with all educational data protection regulations.
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-border/50 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap
                  border-b-2 -mb-[2px]
                  ${
                    isActive
                      ? "text-blue-600 border-b-blue-600"
                      : "text-muted-foreground border-b-transparent hover:text-foreground"
                  }
                `}
                title={tab.description}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {/* Account Information Tab */}
        {activeTab === "account" && user && (
          <ProfileSettings user={user} onUserUpdated={setUser} />
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Update your password to keep your account secure. Make sure to use a strong, unique password.
              </p>
              <FacultyChangePassword />
            </div>
          </div>
        )}

        {/* Exam Preferences Tab */}
        {activeTab === "exam" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Exam Preferences</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure how you want to be notified during exam monitoring and when violations are detected.
              </p>
              <FacultyExamPreferences />
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Notification Settings</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Choose how you want to receive important alerts and updates about your exams and students.
              </p>
              <FacultyNotificationSettings />
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-8" />
    </PageContainer>
  );
}

const FacultySettingsPage = memo(FacultySettingsPageComponent);
export default FacultySettingsPage;
