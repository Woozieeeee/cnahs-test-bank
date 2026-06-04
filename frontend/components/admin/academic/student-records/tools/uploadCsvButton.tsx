"use client";

import { memo, useCallback, useRef, useState } from "react";

import { successToast, errorToast } from "@/lib/swal";

import { uploadStudentRecords } from "@/services/academic_service";

interface Props {
  onSuccess: () => void;
}

function UploadCsvButton({ onSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // SELECT FILE
  // =========================

  const handleSelectFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // =========================
  // HANDLE UPLOAD
  // =========================

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const isCsv = file.name
        .toLowerCase()
        .endsWith(".csv");

      if (!isCsv) {
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
          error?.response?.data?.message ||
            "Failed to upload records."
        );
      } finally {
        setLoading(false);

        if (e.target) {
          e.target.value = "";
        }
      }
    },
    [onSuccess]
  );

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleUpload}
      />

      <button
        onClick={handleSelectFile}
        disabled={loading}
        className="border-border bg-muted text-foreground hover:bg-muted/80 w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Student CSV"}
      </button>
    </>
  );
}

export default memo(UploadCsvButton);
