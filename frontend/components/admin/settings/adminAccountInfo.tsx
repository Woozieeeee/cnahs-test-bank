"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";
import { User, Shield, Crown } from "lucide-react";

interface AdminUser {
  id: number;
  name: string;
  username: string;
  role: string;
  createdAt?: string;
}

interface Props {
  user: AdminUser | null;
}

function AdminAccountInfo({ user }: Props) {
  if (!user) return null;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">Account Information</h2>
      <Card className="rounded-lg p-6 border border-border/50 bg-card">
        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <User size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="mt-1 text-base font-medium text-foreground">{user.name}</p>
            </div>
          </div>

          {/* Username */}
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Shield size={20} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="mt-1 text-base font-medium text-foreground">{user.username}</p>
            </div>
          </div>

          {/* Role & Join Date */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown size={16} className="text-amber-600" />
                <p className="text-sm text-muted-foreground">Role</p>
              </div>
              <p className="text-base font-medium text-foreground">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="mt-1 text-base font-medium text-foreground">{joinDate}</p>
            </div>
          </div>
        </div>
      </Card>

      <p className="mt-4 text-xs text-muted-foreground">
        📌 <strong>Note:</strong> To update your account information, please contact the system administrator or use the user management panel.
      </p>
    </section>
  );
}

export default memo(AdminAccountInfo);
