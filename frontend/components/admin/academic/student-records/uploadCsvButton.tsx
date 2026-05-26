"use client";

import { useRef, useState } from "react";

import { successToast, errorToast } from "@/lib/swal";

import { uploadStudentRecords } from "@/services/academic_service";

interface Props {
  onSuccess: () => void;
}

export default function UploadCsvButton({
  onSuccess,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE UPLOAD
  // =========================

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // =========================
    // VALIDATE CSV
    // =========================

    if (!file.name.endsWith(".csv")) {
      errorToast("Only CSV files are allowed.");

      return;
    }

    try {
      setLoading(true);

      const response = await uploadStudentRecords(file);

      successToast(
        `
        Inserted: ${response.inserted}
        Updated: ${response.updated}
        Skipped: ${response.skipped}
        `
      );

      onSuccess();
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to upload records."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HIDDEN INPUT */}

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleUpload}
      />

      {/* BUTTON */}

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="
          rounded-xl
          bg-slate-900
          px-4
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-slate-800
          disabled:opacity-70
        "
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </>
  );
}
