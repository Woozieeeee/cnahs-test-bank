"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "@/lib/swal";
import { changePassword } from "@/services/auth_service";
import AnimatedPage from "@/components/common/animatedPage";
import PasswordInput from "@/components/common/passwordInput";
import PasswordRules from "@/components/auth/shared/passwordRules";
import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";
import { Loader2 } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const passwordsMatch = newPassword === confirmPassword;
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const isPasswordStrong =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // =========================
    // PASSWORD MATCH
    // =========================

    if (newPassword !== confirmPassword) {
      errorToast("Passwords do not match.");

      return;
    }

    // =========================
    // PASSWORD LENGTH
    // =========================

    if (!isPasswordStrong) {
      errorToast("Please create a stronger password.");

      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword,

        newPassword,
      });

      successToast("Password changed successfully.");

      router.push("/login");
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      {" "}
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gray-50
        px-4
      "
      >
        <form
          onSubmit={handleSubmit}
          className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-8
          shadow-sm
        "
        >
          <h1
            className="
            mb-2
            text-3xl
            font-bold
            text-gray-800
          "
          >
            Change Password
          </h1>

          <p
            className="
            mb-6
            text-sm
            text-gray-500
          "
          >
            Please change your temporary password before
            continuing.
          </p>

          {/* CURRENT PASSWORD */}

          <div className="mb-4">
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Current Password
            </label>

            <PasswordInput
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Current Password"
            />
          </div>

          {/* NEW PASSWORD */}

          <div className="mb-4">
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              New Password
            </label>

            <PasswordInput
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

          {/* CONFIRM PASSWORD */}

          <div className="mb-6">
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Confirm Password
            </label>

            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
            />

            <PasswordMatchIndicator
              visible={!!confirmPassword}
              match={passwordsMatch}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-black
              p-3
              font-medium
              text-white
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading
              ? "Changing Password..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
}
