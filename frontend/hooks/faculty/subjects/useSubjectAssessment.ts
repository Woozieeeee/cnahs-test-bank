"use client";

import { useCallback, useEffect, useState } from "react";

import { getSubjectAssessments } from "@/services/faculty_service";

import { SubjectAssessmentsResponse } from "@/types/assessments/assessment";

export default function useSubjectAssessments(
  subjectId: number
) {
  const [data, setData] =
    useState<SubjectAssessmentsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      if (!subjectId) {
        setData(null);

        return;
      }

      const response =
        await getSubjectAssessments(subjectId);

      setData(response);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load assessments."
      );
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    void fetchAssessments();
  }, [fetchAssessments]);

  return {
    data,

    loading,

    error,

    refresh: fetchAssessments,
  };
}
