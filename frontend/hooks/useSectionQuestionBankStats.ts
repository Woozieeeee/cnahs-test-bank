"use client";

import { useEffect, useState } from "react";

import { getSectionQuestionBankStats } from "@/services/academic_service";

export default function useSectionQuestionBankStats(
  sectionId: number
) {
  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const data =
        await getSectionQuestionBankStats(sectionId);

      setStats(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch question bank statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sectionId) return;

    fetchStats();
  }, [sectionId]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  };
}
