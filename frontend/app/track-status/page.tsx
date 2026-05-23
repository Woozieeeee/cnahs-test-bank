"use client";

import { useState } from "react";

import Link from "next/link";

import { checkStatus } from "@/services/auth_service";

export default function TrackStatusPage() {
  const [studentId, setStudentId] = useState("");

  const [message, setMessage] = useState("");

  const [type, setType] = useState<
    "success" | "error" | "info" | ""
  >("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    try {
      const data = await checkStatus(studentId);

      // =========================
      // PENDING
      // =========================

      if (data.status === "PENDING") {
        setType("info");

        setMessage(
          "Your account is still waiting for administrator approval."
        );
      }

      // =========================
      // APPROVED
      // =========================

      if (data.status === "APPROVED") {
        setType("success");

        setMessage(
          "Your account has been approved. You may now log in."
        );
      }

      // =========================
      // REJECTED
      // =========================

      if (data.status === "REJECTED") {
        setType("error");

        setMessage(
          "Your account was rejected. Please contact the administrator."
        );
      }
    } catch (error: any) {
      setType("error");

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleCheck}
        className="w-full max-w-md rounded-lg border p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">
          Track Account Status
        </h1>

        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        {/* STATUS MESSAGE */}

        {message && (
          <div
            className={`mb-4 rounded p-3 text-sm ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : type === "info"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-white"
        >
          Check Status
        </button>

        <div className="mt-6 text-center text-sm">
          <Link href="/login" className="hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
