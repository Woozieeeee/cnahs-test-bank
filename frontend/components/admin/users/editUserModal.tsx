"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import MotionModal from "@/components/motion/motionModal";
import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import PasswordInputSettings from "@/components/student/settings/passwordInputSettings";
import PasswordRules from "@/components/auth/shared/passwordRules";
import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";
import { getPasswordChecks, isPasswordStrong } from "@/lib/passwordPolicy";
import { errorToast, successToast } from "@/lib/swal";
import type { ManagedUser } from "@/hooks/admin/users/useUserActions";

interface Props {
  open: boolean;
  user: ManagedUser | null;
  onOpenChange: (open: boolean) => void;
  onSave: (
    userId: number,
    data: { name?: string; username?: string; password?: string },
  ) => Promise<void>;
  onDisable: (userId: number, userName: string) => Promise<void>;
  onEnable: (userId: number, userName: string) => Promise<void>;
}

export default function EditUserModal({
  open,
  user,
  onOpenChange,
  onSave,
  onDisable,
  onEnable,
}: Props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setUsername(user.username ?? "");
    setPassword("");
    setConfirmPassword("");
  }, [user]);

  if (!user) return null;

  const canEditUsername = user.role !== "STUDENT";
  const canManageAccount = user.role !== "ADMIN";
  const isDisabled =
    user.status === "DISABLED" || user.status === "REJECTED";
  const passwordsMatch = password === confirmPassword;
  const hasPasswordInput = password.length > 0 || confirmPassword.length > 0;
  const passwordChecks = getPasswordChecks(password);

  const handleSave = async () => {
    if (!name.trim()) {
      errorToast("Name is required.");
      return;
    }

    if (canEditUsername && !username.trim()) {
      errorToast("Username is required.");
      return;
    }

    if (hasPasswordInput) {
      if (!isPasswordStrong(password)) {
        errorToast(
          "Password must meet all security requirements before saving.",
        );
        return;
      }

      if (!passwordsMatch) {
        errorToast("Passwords do not match.");
        return;
      }
    }

    const payload: { name?: string; username?: string; password?: string } = {};

    if (name.trim() !== user.name) payload.name = name.trim();
    if (canEditUsername && username.trim() !== (user.username ?? "")) {
      payload.username = username.trim();
    }
    if (hasPasswordInput) payload.password = password;

    if (Object.keys(payload).length === 0) {
      errorToast("No changes to save.");
      return;
    }

    try {
      setLoading(true);
      await onSave(user.id, payload);
      successToast("User updated successfully.");
      onOpenChange(false);
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update user.";
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountToggle = async () => {
    try {
      setAccountLoading(true);
      if (isDisabled) {
        await onEnable(user.id, user.name);
      } else {
        await onDisable(user.id, user.name);
      }
      onOpenChange(false);
    } finally {
      setAccountLoading(false);
    }
  };

  return (
    <MotionModal open={open} maxWidth="max-w-2xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <ModalHeader
          title="Edit User"
          description={`Manage profile, password, and account access for ${user.name}.`}
          onClose={() => onOpenChange(false)}
        />

        <div className="mt-6 space-y-6">
          <section className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold">Profile</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-muted-foreground text-xs font-medium">Full Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-border bg-background focus:border-ring h-10 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-muted-foreground text-xs font-medium">Role</span>
                <input
                  value={user.role}
                  disabled
                  className="border-border bg-muted text-muted-foreground h-10 w-full rounded-xl border px-3 text-sm"
                />
              </label>

              {canEditUsername ? (
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-muted-foreground text-xs font-medium">Username</span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-border bg-background focus:border-ring h-10 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </label>
              ) : (
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-muted-foreground text-xs font-medium">Student ID</span>
                  <input
                    value={user.studentId || "—"}
                    disabled
                    className="border-border bg-muted text-muted-foreground h-10 w-full rounded-xl border px-3 text-sm"
                  />
                </label>
              )}
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-6">
            <h3 className="text-foreground text-sm font-semibold">Change Password</h3>
            <p className="text-muted-foreground text-xs">
              Leave blank to keep the current password.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="text-muted-foreground text-xs font-medium">New Password</span>
                <PasswordInputSettings
                  value={password}
                  onChange={setPassword}
                  placeholder="New password"
                />
                {password.length > 0 && (
                  <PasswordRules
                    hasMinLength={passwordChecks.hasMinLength}
                    hasUppercase={passwordChecks.hasUppercase}
                    hasLowercase={passwordChecks.hasLowercase}
                    hasNumber={passwordChecks.hasNumber}
                    hasSymbol={passwordChecks.hasSymbol}
                  />
                )}
              </div>

              <label className="space-y-1.5">
                <span className="text-muted-foreground text-xs font-medium">Confirm Password</span>
                <PasswordInputSettings
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm password"
                />
                <PasswordMatchIndicator
                  visible={confirmPassword.length > 0}
                  match={passwordsMatch}
                />
              </label>
            </div>
          </section>

          {canManageAccount && (
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-foreground text-sm font-semibold">Account Access</h3>
              <p className="text-muted-foreground text-xs">
                Current status: <span className="font-medium text-foreground">{user.status}</span>
              </p>

              <button
                type="button"
                onClick={() => void handleAccountToggle()}
                disabled={accountLoading}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-60 ${
                  isDisabled
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {accountLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isDisabled ? "Enable Account" : "Disable Account"}
              </button>
            </section>
          )}
        </div>

        <ModalActions
          submitLabel="Save Changes"
          onSubmit={() => void handleSave()}
          onCancel={() => onOpenChange(false)}
          loading={loading}
        />
      </div>
    </MotionModal>
  );
}
