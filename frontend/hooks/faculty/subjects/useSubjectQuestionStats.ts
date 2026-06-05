"use client";

import { useEffect, useState } from "react";

import { getSubjectQuestionStats } from "@/services/academic_service";

export default function useSubjectQuestionStats(
  subjectId: number
) {
  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const data = await getSubjectQuestionStats(subjectId);

      setStats(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchStats();
  }, [subjectId]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}
