"use client";

import { useCallback, useEffect, useState } from "react";

import type { Exam } from "@/types/exam";

import { getExamById } from "@/services/exam_service";

export default function useExam(id: number) {
  const [exam, setExam] = useState<Exam | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      setError(null);

      const data = await getExamById(id);

      setExam(data);
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load exam."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    exam,
    loading,
    error,
    refresh,
  };
}
