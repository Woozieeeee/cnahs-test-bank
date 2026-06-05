"use client";

import { useEffect, useState } from "react";

import { getSubjectAssessmentSummary } from "@/services/academic_service";

export default function useSubjectAssessmentSummary(
  subjectId: number
) {
  const [summary, setSummary] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const data =
        await getSubjectAssessmentSummary(subjectId);

      setSummary(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch assessment summary"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchSummary();
  }, [subjectId]);

  return {
    summary,
    loading,
    error,
    refresh: fetchSummary,
  };
}
