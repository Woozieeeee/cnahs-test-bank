"use client";

import { useEffect, useState } from "react";

import { getAssessmentDetails } from "@/services/academic_service";

export default function useAssessmentDetails(
  assessmentId: number
) {
  const [assessment, setAssessment] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = async () => {
    try {
      setLoading(true);

      const data = await getAssessmentDetails(assessmentId);

      setAssessment(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch assessment"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!assessmentId) return;

    fetchAssessment();
  }, [assessmentId]);

  return {
    assessment,
    loading,
    error,
    refresh: fetchAssessment,
  };
}
