"use client";

import { memo, useState } from "react";
import { Card } from "@/components/ui/card";
import { changeAdminPassword } from "@/services/admin_service";
import PasswordInputSettings from "@/components/student/settings/passwordInputSettings";
import PasswordRules from "@/components/auth/shared/passwordRules";
import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";
import { CheckCircle, AlertCircle } from "lucide-react";

function AdminChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (!passwordsMatch) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSymbol) {
      setMessage({ type: "error", text: "Password does not meet all requirements" });
      return;
    }

    if (currentPassword === newPassword) {
      setMessage({ type: "error", text: "New password must be different from current password" });
      return;
    }

    setLoading(true);

    try {
      await changeAdminPassword({
        currentPassword,
        newPassword,
      });

      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to change password";
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-lg p-6 border border-border/50 bg-card">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Current Password</label>
          <PasswordInputSettings
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Current Password"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">New Password</label>
          <PasswordInputSettings
            value={newPassword}
            onChange={setNewPassword}
            placeholder="New Password"
          />
          <PasswordRules
            hasMinLength={hasMinLength}
            hasUppercase={hasUppercase}
            hasLowercase={hasLowercase}
            hasNumber={hasNumber}
            hasSymbol={hasSymbol}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Confirm New Password</label>
          <PasswordInputSettings
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
          />
          <PasswordMatchIndicator
            visible={confirmPassword.length > 0}
            match={passwordsMatch}
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50/30 border border-emerald-200/50 text-emerald-700"
                : "bg-red-50/30 border border-red-200/50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </Card>
  );
}

export default memo(AdminChangePassword);
