"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import type { Exam, ExamViolation } from "@/types/exams/examMonitoring";
import api from "@/lib/axios";
import { useExamBroadcast } from "@/hooks/useExamBroadcast";

interface UseAdminExamDetailsOptions {
  pollInterval?: number;
  autoRefresh?: boolean;
}

interface UseAdminExamDetailsReturn {
  data: Exam | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useAdminExamDetails(
  examId: number,
  options: UseAdminExamDetailsOptions = {}
): UseAdminExamDetailsReturn {
  const {
    pollInterval = 5000,
    autoRefresh = true,
  } = options;

  const [data, setData] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { onExamUpdated } = useExamBroadcast();

  const fetchExamDetails = useCallback(
    async (showLoadingState = false) => {
      try {
        if (showLoadingState) {
          setLoading(true);
        }

        setError(null);

        // Fetch comprehensive monitoring data from backend
        const response = await api.get(`/admin/exams/${examId}/monitoring`);

        // Combine exam data with monitoring data
        const exam: Exam = {
          ...response.data.exam,
          activeStudents: response.data.statistics.activeStudents,
          totalStudents: response.data.statistics.totalStudents,
          completedStudents: response.data.statistics.completedStudents,
          flaggedStudents: response.data.statistics.flaggedStudents,
          progressPercentage: response.data.statistics.progressPercentage,
          riskLevel: response.data.statistics.riskLevel,
          timeRemainingMinutes: response.data.statistics.timeRemainingMinutes,
          violations: {
            count: response.data.statistics.violationCount,
            recent: response.data.activityFeed.map((activity: any) => ({
              id: activity.id,
              examId: response.data.exam.id,
              studentId: 0,
              studentName: activity.studentName,
              type: activity.type as ExamViolation["type"],
              severity:
                activity.severity === "ERROR" ? "HIGH" :
                activity.severity === "WARNING" ? "MEDIUM" :
                "LOW",
              timestamp: activity.timestamp,
              metadata: {
                description: activity.action,
                details: activity.action,
              },
              resolved: false,
            })),
          },
          studentMonitoring: response.data.studentMonitoring,
          attempts: response.data.studentMonitoring.map((student: any) => ({
            studentId: student.id,
            status:
              student.status === "ACTIVE"
                ? "IN_PROGRESS"
                : student.status === "FLAGGED"
                  ? "FLAGGED"
                  : "SUBMITTED",
            startedAt: student.startTime,
            submittedAt: student.submissionTime ?? undefined,
            score: student.score,
            student: {
              id: student.id,
              name: student.name,
              studentId: student.studentNumber,
            },
          })),
        };

        setData(exam);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch admin exam details:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load exam details"
        );
      } finally {
        setLoading(false);
      }
    },
    [examId]
  );

  // Initial load
  useEffect(() => {
    fetchExamDetails(true);
  }, [fetchExamDetails]);

  // Polling
  useEffect(() => {
    if (!autoRefresh) return;

    pollIntervalRef.current = setInterval(() => {
      fetchExamDetails(false);
    }, pollInterval);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [autoRefresh, pollInterval, fetchExamDetails]);

  // Broadcast updates
  useEffect(() => {
    const unsubscribeUpdated = onExamUpdated(() => {
      fetchExamDetails(false);
    });

    return () => {
      unsubscribeUpdated();
    };
  }, [onExamUpdated, fetchExamDetails]);

  const refresh = useCallback(async () => {
    await fetchExamDetails(true);
  }, [fetchExamDetails]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
  };
}
