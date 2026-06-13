"use client";

import { memo, useState } from "react";
import { Card } from "@/components/ui/card";
import { changePassword } from "@/services/auth_service";
import PasswordInputSettings from "./passwordInputSettings";
import PasswordRules from "@/components/auth/shared/passwordRules";
import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";
import { CheckCircle, AlertCircle } from "lucide-react";

const ChangePassword = memo(function ChangePassword() {
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

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" });
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

    try {
      setLoading(true);
      await changePassword({
        currentPassword,
        newPassword,
      });

      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to change password";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-lg p-6 border border-border/50">
      <form onSubmit={handleChangePassword} className="w-full space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Current Password
          </label>
          <PasswordInputSettings
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Current Password"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            New Password
          </label>
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
          <label className="block text-sm font-medium text-foreground">
            Confirm New Password
          </label>
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
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </Card>
  );
});

export default ChangePassword;
