"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  successToast,
  errorToast,
  infoToast,
  warningToast,
} from "@/lib/swal";

import { loginUser } from "@/services/auth_service";

import { getTimeBasedGreeting } from "@/lib/greetings";

import { authInputClass } from "../shared/authInputClass";

import { authButtonClass } from "../shared/authButtonClass";

import PasswordInput from "@/components/common/passwordInput";

import LoginHeader from "./loginHeader";

import LoginLinks from "./loginLinks";

import ForgotPasswordModal from "./forgotPasswordModal";
import { useAuthContext } from "@/contexts/authContext";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthContext();

  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        identifier,
        password,
      });

      const { greeting, emoji } = getTimeBasedGreeting(
        data.user.isFirstLogin
      );
      successToast(
        `${greeting}, ${data.user.name}! ${emoji}`
      );

      setUser(data.user);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      }

      if (data.user.role === "FACULTY") {
        if (data.user.mustChangePassword) {
          router.push("/change_password");

          return;
        }

        router.push("/faculty/dashboard");
      }

      if (data.user.role === "STUDENT") {
        router.push("/student/dashboard");
      }
    } catch (error: any) {
      const message = error.response?.data?.message;

      if (message === "Account pending approval") {
        infoToast(
          "Your account is waiting for admin approval."
        );

        return;
      }

      if (message === "Account rejected") {
        errorToast("Please contact the administrator.");

        return;
      }

      if (message === "Account disabled") {
        warningToast(
          "Your account is disabled. Visit the Dean's Office or submit a password reset request."
        );

        return;
      }

      if (
        message ===
        "Too many login attempts. Please try again later."
      ) {
        const remainingTime =
          error.response?.data?.remainingTime;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const timeString =
          minutes > 0
            ? `${minutes} minute${minutes > 1 ? "s" : ""} and ${seconds} second${seconds !== 1 ? "s" : ""}`
            : `${seconds} second${seconds !== 1 ? "s" : ""}`;

        warningToast(
          `Too many login attempts. Please try again in ${timeString}.`
        );

        return;
      }

      errorToast(message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <LoginHeader />

        <input
          type="text"
          placeholder="Enter your Student ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={`${authInputClass} mb-4`}
        />

        <div className="mb-2">
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />
        </div>

        <div className="mb-4 text-right">
          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="text-primary text-sm font-medium transition hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={authButtonClass}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <LoginLinks
          onForgotPassword={() => setForgotOpen(true)}
        />
      </form>

      <ForgotPasswordModal
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        initialIdentifier={identifier}
      />
    </>
  );
}
