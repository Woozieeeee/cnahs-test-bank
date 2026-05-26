"use client";

import { useState } from "react";

import Link from "next/link";

import { checkStatus } from "@/services/auth_service";

import StudentIdField from "@/components/auth/shared/studentIdField";

import TrackStatusHeader from "./trackStatusHeader";

import TrackStatusResult from "./trackStatusResult";

export default function TrackStatusForm() {
  const [studentId, setStudentId] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<
    "success" | "error" | "info" | ""
  >("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    try {
      setLoading(true);

      const data = await checkStatus(studentId);

      if (data.status === "PENDING") {
        setType("info");

        setMessage(
          "Your account is still waiting for administrator approval."
        );
      }

      if (data.status === "APPROVED") {
        setType("success");

        setMessage(
          "Your account has been approved. You may now log in."
        );
      }

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
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCheck}
      className="
        w-full
        max-w-md
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <TrackStatusHeader />

      <StudentIdField
        studentId={studentId}
        onChange={setStudentId}
      />

      <TrackStatusResult type={type} message={message} />

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-slate-900
          p-3
          text-white
          transition
          hover:bg-slate-800
          disabled:opacity-70
        "
      >
        {loading ? "Checking..." : "Check Status"}
      </button>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/login"
          className="
            text-slate-500
            hover:underline
          "
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
