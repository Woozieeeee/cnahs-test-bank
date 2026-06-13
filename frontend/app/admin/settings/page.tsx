"use client";

import { memo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useProtectedRoute from "@/hooks/auth/useProtectedRoute";
import Tabs from "@/components/common/tabs/tabs";
import ProfileSettings from "@/components/settings/profileSettings";
import AdminChangePassword from "@/components/admin/settings/adminChangePassword";
import AdminSystemSettings from "@/components/admin/settings/adminSystemSettings";
import AdminSecuritySettings from "@/components/admin/settings/adminSecuritySettings";
import AdminNotificationSettings from "@/components/admin/settings/adminNotificationSettings";
import PageContainer from "@/components/layout/pages/pageContainer";
import PageHeader from "@/components/layout/pages/pageHeader";
import PageTitle from "@/components/layout/pages/pageTitle";
import { Card } from "@/components/ui/card";
import { Loader2, Shield, Bell, Sliders, Lock, Settings } from "lucide-react";

const ADMIN_TAB_FROM_PARAM: Record<string, string> = {
  account: "Account Information",
  password: "Change Password",
  system: "System Configuration",
  security: "Security Policies",
  notifications: "Notifications",
};

function AdminSettingsPageComponent() {
  const { user, loading: authLoading, isAuthenticated, setUser } =
    useProtectedRoute(["ADMIN"]);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    ADMIN_TAB_FROM_PARAM[tabParam ?? ""] ?? "Account Information"
  );

  useEffect(() => {
    if (tabParam && ADMIN_TAB_FROM_PARAM[tabParam]) {
      setActiveTab(ADMIN_TAB_FROM_PARAM[tabParam]);
    }
  }, [tabParam]);

  if (authLoading || !isAuthenticated) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </PageContainer>
    );
  }

  const SETTINGS_TABS = [
    "Account Information",
    "Change Password",
    "System Configuration",
    "Security Policies",
    "Notifications",
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          title="System Settings"
          description={`Manage platform configuration, security, and system-wide settings, ${user?.name}`}
        />
      </PageHeader>

      <div className="mt-12 space-y-8">
        {/* Admin Access Info (Visible across all tabs or can be moved into a specific tab? Let's keep it above the tabs) */}
        <section>
          <Card className="rounded-lg p-6 border border-border/50 bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-foreground">Admin Access Overview</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>🔐 Account Security:</strong> Admin accounts have elevated privileges. Maintain strong passwords and keep your credentials confidential.
              </p>
              <div className="pt-3 border-t border-border/30">
                <p className="text-xs">
                  <strong>ℹ️ System Impact:</strong> Changes made in these settings affect all users and platform functionality. Test changes in a staging environment first.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Tabs Control */}
        <Tabs tabs={SETTINGS_TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === "Account Information" && user && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ProfileSettings user={user} onUserUpdated={setUser} />
            </section>
          )}

          {activeTab === "Change Password" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
              </div>
              <AdminChangePassword />
            </section>
          )}

          {activeTab === "System Configuration" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Settings size={20} className="text-purple-600" />
                <h2 className="text-lg font-semibold text-foreground">System Configuration</h2>
              </div>
              <AdminSystemSettings />
            </section>
          )}

          {activeTab === "Security Policies" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={20} className="text-red-600" />
                <h2 className="text-lg font-semibold text-foreground">Security Policies</h2>
              </div>
              <AdminSecuritySettings />
            </section>
          )}

          {activeTab === "Notifications" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-orange-600" />
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              </div>
              <AdminNotificationSettings />
            </section>
          )}
        </div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </PageContainer>
  );
}

const AdminSettingsPage = memo(AdminSettingsPageComponent);
export default AdminSettingsPage;
