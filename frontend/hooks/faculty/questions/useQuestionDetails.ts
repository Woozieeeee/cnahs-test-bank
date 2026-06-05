"use client";

import { useEffect, useState } from "react";

import { getQuestionDetails } from "@/services/academic_service";

export default function useQuestionDetails(
  questionId: number
) {
  const [question, setQuestion] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const data = await getQuestionDetails(questionId);

      setQuestion(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch question"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!questionId) return;

    fetchQuestion();
  }, [questionId]);

  return {
    question,
    loading,
    error,
    refresh: fetchQuestion,
  };
}
