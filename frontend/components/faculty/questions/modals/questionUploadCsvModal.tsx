"use client";

import { useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalActions from "@/components/common/modal/modalActions";

import { successToast, errorToast } from "@/lib/swal";

import {
  uploadQuestionCsv,
  downloadQuestionTemplate,
} from "@/services/faculty_service";

interface Props {
  open: boolean;

  topicId: number;

  onClose: () => void;

  onSuccess: () => void;
}

export default function QuestionUploadCsvModal({
  open,
  topicId,
  onClose,
  onSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const result = await uploadQuestionCsv(topicId, file);

      successToast(
        `${result.importedRows} questions imported`
      );

      onSuccess();

      onClose();
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to upload CSV."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    await downloadQuestionTemplate(topicId);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border-border w-full max-w-xl rounded-2xl border p-6">
        <ModalHeader
          title="Upload Questions"
          description="Upload questions using CSV."
          onClose={onClose}
        />

        <div className="mt-6 space-y-4">
          <button
            onClick={handleDownloadTemplate}
            className="border-border w-full rounded-xl border p-3"
          >
            Download CSV Template
          </button>

          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />
        </div>

        <ModalActions
          submitLabel={
            loading ? "Uploading..." : "Upload CSV"
          }
          submitDisabled={loading || !file}
          onSubmit={handleUpload}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
