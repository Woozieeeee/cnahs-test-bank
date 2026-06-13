"use client";

import { useState, useCallback } from "react";

import {
  flagStudent,
  unlockStudent,
  notifyStudent,
  endExam,
  sendAnnouncement,
} from "@/services/admin/exams/actions";
import { confirmDialog, successToast, errorToast } from "@/lib/swal";

interface UseAdminExamMonitoringActionsOptions {
  examId: number;
  onSuccess?: () => void | Promise<void>;
}

export function useAdminExamMonitoringActions({
  examId,
  onSuccess,
}: UseAdminExamMonitoringActionsOptions) {
  const [actingStudentId, setActingStudentId] = useState<number | null>(null);
  const [isEndingExam, setIsEndingExam] = useState(false);
  const [isAnnouncing, setIsAnnouncing] = useState(false);

  const runAction = useCallback(
    async (studentId: number | null, action: () => Promise<void>) => {
      if (studentId !== null) setActingStudentId(studentId);
      try {
        await action();
        await onSuccess?.();
      } finally {
        if (studentId !== null) setActingStudentId(null);
      }
    },
    [onSuccess]
  );

  const handleFlagStudent = useCallback(
    async (studentId: number, studentName: string, reason?: string) => {
      const result = await confirmDialog({
        title: "Flag Student",
        text: `Flag ${studentName} for review? They will be marked as flagged and a violation will be recorded.`,
        confirmText: "Flag Student",
        cancelText: "Cancel",
        destructive: true,
      });

      if (!result.isConfirmed) return;

      await runAction(studentId, async () => {
        try {
          const response = await flagStudent(examId, studentId, reason);
          successToast(response.message || "Student flagged successfully");
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to flag student";
          errorToast(message);
          throw err;
        }
      });
    },
    [examId, runAction]
  );

  const handleUnlockStudent = useCallback(
    async (studentId: number, studentName: string) => {
      const result = await confirmDialog({
        title: "Unlock Student",
        text: `Allow ${studentName} to continue the exam?`,
        confirmText: "Unlock",
        cancelText: "Cancel",
        destructive: false,
      });

      if (!result.isConfirmed) return;

      await runAction(studentId, async () => {
        try {
          const response = await unlockStudent(examId, studentId);
          successToast(response.message || "Student unlocked successfully");
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to unlock student";
          errorToast(message);
          throw err;
        }
      });
    },
    [examId, runAction]
  );

  const handleNotifyStudent = useCallback(
    async (studentId: number, message: string) => {
      if (!message.trim()) {
        errorToast("Please enter a message");
        return;
      }

      await runAction(studentId, async () => {
        try {
          const response = await notifyStudent(examId, studentId, message.trim());
          successToast(response.message || "Notification sent");
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to notify student";
          errorToast(message);
          throw err;
        }
      });
    },
    [examId, runAction]
  );

  const handleEndExam = useCallback(
    async (force: boolean) => {
      const result = await confirmDialog({
        title: force ? "Force End Exam" : "End Exam",
        text: force
          ? "This will auto-submit all in-progress students and end the exam for everyone. This cannot be undone."
          : "This will mark the exam as completed. Students still in progress may lose access.",
        confirmText: force ? "Force End" : "End Exam",
        cancelText: "Cancel",
        destructive: true,
      });

      if (!result.isConfirmed) return;

      setIsEndingExam(true);
      try {
        const response = await endExam(examId, force);
        successToast(
          response.message ||
            `Exam ended${force ? ` (${response.affectedStudents} students auto-submitted)` : ""}`
        );
        await onSuccess?.();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to end exam";
        errorToast(message);
      } finally {
        setIsEndingExam(false);
      }
    },
    [examId, onSuccess]
  );

  const handleSendAnnouncement = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        errorToast("Please enter an announcement");
        return;
      }

      setIsAnnouncing(true);
      try {
        const response = await sendAnnouncement(examId, message.trim());
        successToast(response.message || "Announcement sent");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to send announcement";
        errorToast(message);
      } finally {
        setIsAnnouncing(false);
      }
    },
    [examId]
  );

  return {
    actingStudentId,
    isEndingExam,
    isAnnouncing,
    handleFlagStudent,
    handleUnlockStudent,
    handleNotifyStudent,
    handleEndExam,
    handleSendAnnouncement,
  };
}
