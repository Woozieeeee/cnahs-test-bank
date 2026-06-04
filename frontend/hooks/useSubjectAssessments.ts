"use client";

import { useEffect, useState } from "react";

import { getSubjectAssessments } from "@/services/academic_service";

export default function useSubjectAssessments(
  subjectId: number
) {
  const [assessments, setAssessments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = async () => {
    try {
      setLoading(true);

      const data = await getSubjectAssessments(subjectId);

      setAssessments(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch assessments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchAssessments();
  }, [subjectId]);

  return {
    assessments,
    loading,
    error,
    refresh: fetchAssessments,
  };
}
