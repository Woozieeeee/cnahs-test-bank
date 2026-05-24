"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { successToast, errorToast } from "@/lib/swal";

import { changePassword } from "@/services/auth_service";

import AnimatedPage from "@/components/common/animatedPage";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

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

    if (newPassword.length < 8) {
      errorToast("Password must be at least 8 characters.");

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

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="
              w-full
              rounded-lg
              border
              p-3
              outline-none
              focus:border-black
            "
              required
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

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="
              w-full
              rounded-lg
              border
              p-3
              outline-none
              focus:border-black
            "
              required
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

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="
              w-full
              rounded-lg
              border
              p-3
              outline-none
              focus:border-black
            "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            rounded-lg
            bg-black
            p-3
            font-medium
            text-white
            transition
            hover:opacity-90
            disabled:opacity-50
          "
          >
            {loading
              ? "Changing Password..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
}
