"use client";

import { useState } from "react";
import Link from "next/link";
import {
  successToast,
  errorToast,
  infoToast,
} from "@/lib/swal";
import { loginUser } from "@/services/auth_service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        login,
        password,
      });

      // =========================
      // FIRST LOGIN
      // =========================

      if (data.user.firstLogin) {
        await successToast(
          "Your account has been approved successfully."
        );
      } else {
        // =========================
        // NORMAL LOGIN
        // =========================

        await successToast(
          `Welcome back, ${data.user.name}!`
        );
      }
      // =========================
      // ROLE REDIRECT
      // =========================

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      }

      if (data.user.role === "FACULTY") {
        router.push("/faculty/dashboard");
      }

      if (data.user.role === "STUDENT") {
        router.push("/student/dashboard");
      }
    } catch (error: any) {
      const message = error.response?.data?.message;

      // =========================
      // PENDING ACCOUNT
      // =========================

      if (message === "Account pending approval") {
        infoToast(
          "Your account is waiting for admin approval."
        );

        return;
      }

      // =========================
      // REJECTED ACCOUNT
      // =========================

      if (message === "Account rejected") {
        errorToast("Please contact the administrator.");

        return;
      }

      // =========================
      // DEFAULT ERROR
      // =========================

      errorToast(
        message ||
          "The Student ID and Password is incorrect. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">Login</h1>

        <input
          type="text"
          placeholder="Enter your Student ID"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-white"
        >
          Login
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Register here
          </Link>
        </div>

        <div className="mt-2 text-center text-sm">
          <Link
            href="/track-status"
            className="text-gray-600 hover:underline"
          >
            Track application status
          </Link>
        </div>
      </form>
    </div>
  );
}
