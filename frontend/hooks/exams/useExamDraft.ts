"use client";

import { useEffect, useState } from "react";

import {
  getExamDraft,
  saveExamDraft,
  deleteExamDraft,
} from "@/services/faculty_service";

import { ExamDraft } from "@/types/exams/examDraft";

export default function useExamDraft(subjectId: number) {
  const [draft, setDraft] = useState<ExamDraft | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchDraft = async () => {
    try {
      setLoading(true);

      const data = await getExamDraft(subjectId);

      console.log("Fetched Draft:", data);

      setDraft(data);
      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch draft."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) {
      return;
    }

    fetchDraft();
  }, [subjectId]);

  return {
    draft,

    loading,

    error,

    refresh: fetchDraft,

    saveDraft: (
      currentStep: number,
      title: string,
      draftData: any
    ) =>
      saveExamDraft(subjectId, {
        currentStep,
        title,
        draftData,
      }),

    deleteDraft: () => deleteExamDraft(subjectId),
  };
}
