"use client";

import { useCallback, useEffect, useState } from "react";

import { getQuestionImportHistory } from "@/services/faculty_service";

import { ImportJob } from "@/types/imports/importJob";

export default function useQuestionImportHistory(
  topicId: number
) {
  const [history, setHistory] = useState<ImportJob[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      if (!topicId) {
        setHistory([]);
        return;
      }

      const data = await getQuestionImportHistory(topicId);

      setHistory(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load import history."
      );
    } finally {
      setLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    void fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    refresh: fetchHistory,
  };
}
