"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/services/auth_service";

export default function LoginPage() {
  const [login, setLogin] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        login,
        password,
      });

      console.log(data);

      alert("Login successful");
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter your Student ID"
          value={login}
          onChange={(e) =>
            setLogin(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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
      </form>
    </div>
  );
}