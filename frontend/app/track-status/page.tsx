"use client";

import { useState } from "react";

import Link from "next/link";

import {
  successToast,
  errorToast,
  infoToast,
} from "@/lib/swal";

import { checkStatus } from "@/services/auth_service";

export default function TrackStatusPage() {
  const [studentId, setStudentId] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await checkStatus(studentId);

      if (data.status === "PENDING") {
        infoToast(
          "Your account is still pending approval."
        );
      }

      if (data.status === "APPROVED") {
        successToast("Your account has been approved.");
      }

      if (data.status === "REJECTED") {
        errorToast("Your account was rejected.");
      }
    } catch (error: any) {
      errorToast(
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
