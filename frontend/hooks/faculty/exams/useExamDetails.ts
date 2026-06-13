"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import type { Exam, ExamViolation } from "@/types/exams/examMonitoring";
import { getExamMonitoringDetails } from "@/services/faculty/exams/monitoring";
import { useExamBroadcast } from "@/hooks/useExamBroadcast";

interface UseExamDetailsOptions {
  pollInterval?: number;
  autoRefresh?: boolean;
}

interface UseExamDetailsReturn {
  data: Exam | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useExamDetails(
  examId: number,
  options: UseExamDetailsOptions = {}
): UseExamDetailsReturn {
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
        const response = await getExamMonitoringDetails(examId);

        // Combine exam data with monitoring data
        const exam: Exam = {
          ...response.exam,
          activeStudents: response.statistics.activeStudents,
          totalStudents: response.statistics.totalStudents,
          completedStudents: response.statistics.completedStudents,
          flaggedStudents: response.statistics.flaggedStudents,
          progressPercentage: response.statistics.progressPercentage,
          riskLevel: response.statistics.riskLevel,
          timeRemainingMinutes: response.statistics.timeRemainingMinutes,
          violations: {
            count: response.statistics.violationCount,
            recent: response.activityFeed.map((activity) => ({
              id: activity.id,
              examId: response.exam.id,
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
          studentMonitoring: response.studentMonitoring,
          attempts: response.studentMonitoring.map((student) => ({
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
        console.error("Failed to fetch exam details:", err);

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
