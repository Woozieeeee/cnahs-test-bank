"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { successToast, errorToast } from "@/lib/swal";

import { changePassword } from "@/services/auth_service";

import PasswordInput from "@/components/common/passwordInput";

import PasswordRules from "../shared/passwordRules";

import PasswordMatchIndicator from "../shared/passwordMatchIndicator";

import ChangePasswordHeader from "./changePasswordHeader";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

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

    if (!passwordsMatch) {
      errorToast("Passwords do not match.");

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
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        max-w-md
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <ChangePasswordHeader />

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
          visible={confirmPassword.length > 0}
          match={passwordsMatch}
        />
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-slate-900
          p-3
          font-medium
          text-white
          transition
          hover:bg-slate-800
          disabled:opacity-70
        "
      >
        {loading
          ? "Changing Password..."
          : "Change Password"}
      </button>
    </form>
  );
}
