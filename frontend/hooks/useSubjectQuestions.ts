"use client";

import { useEffect, useState } from "react";

import { getSubjectQuestions } from "@/services/academic_service";

export default function useSubjectQuestions(
  subjectId: number
) {
  const [questions, setQuestions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const data = await getSubjectQuestions(subjectId);

      setQuestions(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch questions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchQuestions();
  }, [subjectId]);

  return {
    questions,
    loading,
    error,
    refresh: fetchQuestions,
  };
}
