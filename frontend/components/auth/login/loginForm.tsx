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

import PasswordInput from "@/components/common/passwordInput";

import LoginHeader from "./loginHeader";

import LoginLinks from "./loginLinks";

export default function LoginForm() {
  const router = useRouter();

  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        login,
        password,
      });

      successToast(`Welcome back, ${data.user.name}!`);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      }

      if (data.user.role === "FACULTY") {
        if (data.user.mustChangePassword) {
          router.push("/change-password");

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

      if (
        message ===
        "Too many login attempts. Please try again later."
      ) {
        warningToast(message);

        return;
      }

      errorToast(message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border p-6 shadow"
    >
      <LoginHeader />

      <input
        type="text"
        placeholder="Enter your Student ID"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="mb-4 w-full rounded border p-3"
      />

      <div className="mb-4">
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded
          bg-black
          p-3
          text-white
        "
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      <LoginLinks />
    </form>
  );
}
