"use client";

import { useEffect, useState } from "react";

import { getFacultyAssessmentDetails } from "@/services/faculty_service";

export default function useFacultyAssessmentDetails(
  subjectId: number,
  assessmentId: number,
) {
  const [assessment, setAssessment] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = async () => {
    try {
      setLoading(true);

      const data = await getFacultyAssessmentDetails(
        subjectId,
        assessmentId,
      );

      setAssessment(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch assessment",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId || !assessmentId) return;

    fetchAssessment();
  }, [subjectId, assessmentId]);

  return {
    assessment,
    loading,
    error,
    refresh: fetchAssessment,
  };
}
