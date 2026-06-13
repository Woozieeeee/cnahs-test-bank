"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import type { Exam, ExamFilter } from "@/types/exams/examMonitoring";
import { getAdminExams } from "@/services/admin_service";
import { useExamBroadcast } from "@/hooks/useExamBroadcast";

interface UseAdminExamsOptions {
  pollInterval?: number;
  autoRefresh?: boolean;
  initialFilter?: ExamFilter;
}

interface UseAdminExamsReturn {
  data: Exam[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  updateFilter: (filter: ExamFilter) => void;
  currentFilter: ExamFilter;
}

export function useAdminExams(
  options: UseAdminExamsOptions = {}
): UseAdminExamsReturn {
  const {
    pollInterval = 5000,
    autoRefresh = true,
    initialFilter = {},
  } = options;

  const [data, setData] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentFilter, setCurrentFilter] =
    useState<ExamFilter>(initialFilter);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { onExamCreated, onExamUpdated } = useExamBroadcast();

  const fetchExams = useCallback(
    async (showLoadingState = false) => {
      try {
        if (showLoadingState) {
          setLoading(true);
        }

        setError(null);

        const examsData = await getAdminExams(currentFilter);

        setData(examsData);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch exams:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load exams"
        );
      } finally {
        setLoading(false);
      }
    },
    [currentFilter]
  );

  // Initial load
  useEffect(() => {
    fetchExams(true);
  }, [fetchExams]);

  // Polling
  useEffect(() => {
    if (!autoRefresh) return;

    pollIntervalRef.current = setInterval(() => {
      fetchExams(false);
    }, pollInterval);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [autoRefresh, pollInterval, fetchExams]);

  // Broadcast updates
  useEffect(() => {
    const unsubscribeCreated = onExamCreated(() => {
      fetchExams(false);
    });

    const unsubscribeUpdated = onExamUpdated(() => {
      fetchExams(false);
    });

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
    };
  }, [onExamCreated, onExamUpdated, fetchExams]);

  const refresh = useCallback(async () => {
    await fetchExams(true);
  }, [fetchExams]);

  const updateFilter = useCallback((filter: ExamFilter) => {
    setCurrentFilter((prev) => ({
      ...prev,
      ...filter,
    }));
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    updateFilter,
    currentFilter,
  };
}
