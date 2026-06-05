"use client";

import { useEffect, useState } from "react";

import ModalContainer from "@/components/common/modal/modalContainer";
import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";

import MotionButton from "@/components/motion/motionButton";

import { successToast, errorToast } from "@/lib/swal";

import {
  uploadQuestionCsv,
  downloadQuestionTemplate,
} from "@/services/faculty_service";

import { formatFileSize } from "@/lib/formatFileSize";

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

  useEffect(() => {
    if (!open) {
      setFile(null);
    }
  }, [open]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      errorToast("Only CSV files are allowed.");

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      errorToast("CSV file must be less than 5MB.");

      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const result = await uploadQuestionCsv(topicId, file);

      successToast(
        `${result.importedRows} questions imported successfully.`
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
    try {
      await downloadQuestionTemplate(topicId);
    } catch {
      errorToast("Failed to download template.");
    }
  };

  return (
    <ModalContainer open={open} maxWidth="max-w-xl">
      <ModalHeader
        title="Upload Questions"
        description="Import questions in bulk using a CSV file."
        onClose={onClose}
      />

      <div className="mt-6 space-y-5">
        <MotionButton
          onClick={handleDownloadTemplate}
          className="border-border hover:bg-muted w-full rounded-xl border p-3 text-sm font-medium transition"
        >
          Download CSV Template
        </MotionButton>

        <div className="bg-muted/30 border-border rounded-xl border border-dashed p-6">
          <div className="space-y-2 text-center">
            <p className="font-medium">Select CSV File</p>

            <p className="text-muted-foreground text-sm">
              Upload a CSV file containing questions,
              options, difficulty, and answers.
            </p>
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-4 block w-full text-sm"
          />

          {file && (
            <div className="bg-card border-border mt-4 rounded-xl border p-3">
              <p className="font-medium">{file.name}</p>

              <p className="text-muted-foreground text-sm">
                {formatFileSize(file.size)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-muted/30 rounded-xl p-4 text-sm">
          <p className="mb-2 font-medium">
            CSV Requirements
          </p>

          <ul className="text-muted-foreground list-disc space-y-1 pl-5">
            <li>Use the provided template.</li>

            <li>
              Difficulty must be: EASY, MEDIUM, HARD, or
              EXPERT.
            </li>

            <li>Correct answer must match one option.</li>

            <li>Duplicate questions will be skipped.</li>
          </ul>
        </div>
      </div>

      <ModalActions
        submitLabel={
          loading ? "Uploading..." : "Upload CSV"
        }
        submitDisabled={loading || !file}
        onSubmit={handleUpload}
        onCancel={onClose}
      />
    </ModalContainer>
  );
}
