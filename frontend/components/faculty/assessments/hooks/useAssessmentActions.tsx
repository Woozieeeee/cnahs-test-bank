"use client";

import { useState } from "react";

import {
  archiveExam,
  restoreExam,
  cancelExam,
} from "@/services/faculty_service";

import {
  confirmDialog,
  successToast,
  errorToast,
} from "@/lib/swal";

import type { Assessment } from "@/types/assessments/assessment";

export default function useAssessmentActions(
  assessment: Assessment
) {
  const [isArchiving, setIsArchiving] = useState(false);

  const [isRestoring, setIsRestoring] = useState(false);

  const [isCancelling, setIsCancelling] = useState(false);

  const handleArchive = async () => {
    const result = await confirmDialog({
      title: "Archive Exam",
      text: "Are you sure you want to archive this exam?",
      confirmText: "Archive",
      cancelText: "Cancel",
      destructive: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsArchiving(true);

    try {
      await archiveExam(assessment.id);

      successToast("Exam archived successfully");

      window.location.reload();
    } catch {
      errorToast("Failed to archive exam.");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleRestore = async () => {
    const result = await confirmDialog({
      title: "Restore Exam",
      text: "Are you sure you want to restore this exam?",
      confirmText: "Restore",
      cancelText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsRestoring(true);

    try {
      await restoreExam(assessment.id);

      successToast("Exam restored successfully");

      window.location.reload();
    } catch {
      errorToast("Failed to restore exam.");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleCancel = async () => {
    const result = await confirmDialog({
      title: "Cancel Exam",
      text: "Are you sure you want to cancel this exam?",
      confirmText: "Cancel Exam",
      cancelText: "Keep Exam",
      destructive: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsCancelling(true);

    try {
      await cancelExam(assessment.id);

      successToast("Exam cancelled successfully");

      window.location.reload();
    } catch {
      errorToast("Failed to cancel exam.");
    } finally {
      setIsCancelling(false);
    }
  };

  return {
    handleArchive,
    handleRestore,
    handleCancel,

    isArchiving,
    isRestoring,
    isCancelling,
  };
}
