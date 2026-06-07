"use client";

import { useState } from "react";

import { createExam } from "../../services/faculty_service";
import { CreateExamPayload } from "../../../backend/src/types/exams/create_exams_payload";

export default function useCreateExam() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleCreateExam = async (
    subjectId: number,
    payload: CreateExamPayload
  ) => {
    try {
      setLoading(true);

      setError(null);

      const exam = await createExam(subjectId, payload);

      return exam;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Failed to create exam.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,

    handleCreateExam,
  };
}
