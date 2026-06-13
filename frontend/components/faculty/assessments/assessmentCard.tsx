"use client";

import { memo, useEffect, useState } from "react";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import type { Assessment } from "@/types/assessments/assessment";
import type { ExamDraft } from "@/types/exams/examDraft";

import { getDraftStepLabel } from "@/lib/exams/getDraftStepLabel";

import {
  archiveExam,
  restoreExam,
  cancelExam,
} from "@/services/faculty_service";

import { getExamForEdit } from "@/services/faculty_service";

import {
  confirmDialog,
  successToast,
  errorToast,
} from "@/lib/swal";

interface Props {
  assessment?: Assessment;
  draft?: ExamDraft;
  onContinueDraft?: () => void;
  onEditAssessment?: (assessmentData: any) => void;
}

function AssessmentCard({
  assessment,
  draft,
  onContinueDraft,
  onEditAssessment,
}: Props) {
  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-700",

    SCHEDULED: "bg-blue-100 text-blue-700",

    ONGOING: "bg-green-100 text-green-700",

    COMPLETED: "bg-purple-100 text-purple-700",

    ARCHIVED: "bg-red-100 text-red-700",

    CANCELLED: "bg-orange-100 text-orange-700",
  };

  const [timeRemaining, setTimeRemaining] =
    useState<string>("");

  const [timerLabel, setTimerLabel] = useState<string>("");

  const [menuOpen, setMenuOpen] = useState(false);

  const [isArchiving, setIsArchiving] = useState(false);

  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    if (!assessment || !assessment.startsAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const startTime = new Date(
        assessment.startsAt!
      ).getTime();
      
      // Use endsAt if available, otherwise calculate from duration
      const endTime = assessment.endsAt
        ? new Date(assessment.endsAt).getTime()
        : startTime + assessment.duration * 60 * 1000;

      if (now < startTime) {
        // SCHEDULED: Time until exam starts
        const diff = startTime - now;
        const days = Math.floor(
          diff / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor(
          (diff % (1000 * 60)) / 1000
        );
        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel(`${assessment.status} - Starts In`);
      } else if (now < endTime) {
        // ONGOING: Time remaining until exam ends
        const diff = endTime - now;
        const days = Math.floor(
          diff / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor(
          (diff % (1000 * 60)) / 1000
        );

        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel(`${assessment.status} - Time Remaining`);
      } else {
        // COMPLETED: Exam has ended
        setTimeRemaining("00:00:00:00");
        setTimerLabel("COMPLETED - Exam Ended");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [assessment]);

  const handleArchive = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);

    const result = await confirmDialog({
      title: "Archive Exam",
      text: "Are you sure you want to archive this exam? This action can be undone.",
      confirmText: "Archive",
      cancelText: "Cancel",
      destructive: true,
    });

    if (result.isConfirmed) {
      setIsArchiving(true);
      try {
        await archiveExam(assessment!.id);
        successToast("Exam archived successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to archive exam:", error);
        errorToast(
          "Failed to archive exam. Please try again."
        );
      } finally {
        setIsArchiving(false);
      }
    }
  };

  const handleRestore = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);

    const result = await confirmDialog({
      title: "Restore Exam",
      text: "Are you sure you want to restore this exam?",
      confirmText: "Restore",
      cancelText: "Cancel",
      destructive: false,
    });

    if (result.isConfirmed) {
      setIsRestoring(true);
      try {
        await restoreExam(assessment!.id);
        successToast("Exam restored successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to restore exam:", error);
        errorToast(
          "Failed to restore exam. Please try again."
        );
      } finally {
        setIsRestoring(false);
      }
    }
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(false);

    if (!assessment) return;

    // Check if exam starts within 10 minutes
    const now = new Date().getTime();
    const startTime = new Date(assessment.startsAt!).getTime();
    const timeUntilStart = startTime - now;
    const tenMinutesInMs = 10 * 60 * 1000;

    if (timeUntilStart <= tenMinutesInMs && timeUntilStart > 0) {
      await confirmDialog({
        title: "Cannot Edit Assessment",
        text: "This assessment will start in less than 10 minutes. Editing is disabled to prevent disruptions.",
        confirmText: "OK",
        cancelText: "Cancel",
        destructive: true,
      });
      return;
    }

    try {
      const examData = await getExamForEdit(assessment.subjectId, assessment.id);
      onEditAssessment?.(examData);
    } catch (error) {
      console.error("Failed to load exam details:", error);
      errorToast("Failed to load exam details. Please try again.");
    }
  };

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);

    const result = await confirmDialog({
      title: "Cancel Exam",
      text: "Are you sure you want to cancel this exam? It will be automatically deleted after 24 hours if not restored.",
      confirmText: "Cancel Exam",
      cancelText: "Keep Exam",
      destructive: true,
    });

    if (result.isConfirmed) {
      try {
        await cancelExam(assessment!.id);
        successToast("Exam cancelled successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to cancel exam:", error);
        errorToast(
          "Failed to cancel exam. Please try again."
        );
      }
    }
  };

  if (draft) {
    return (
      <MotionCard>
        <div className="border-border hover:border-ring flex h-full flex-col rounded-2xl border p-6 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="line-clamp-2 text-lg font-semibold">
                {draft.title || "Untitled Draft"}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Draft Assessment
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                statusColors.DRAFT
              }`}
            >
              DRAFT
            </span>
          </div>

          <div className="mt-4 flex flex-1 flex-col">
            <p className="text-muted-foreground text-sm">
              Last Updated
            </p>

            <p className="mt-1 text-sm font-medium">
              {new Date(draft.updatedAt).toLocaleString()}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <MetricCard
                label="Current Step"
                value={getDraftStepLabel(draft.currentStep)}
              />

              <MetricCard
                label="Questions"
                value={
                  draft.draftData.selectedQuestions
                    ?.length || 0
                }
              />
            </div>

            <button
              onClick={onContinueDraft}
              className="text-primary mt-auto pt-5 text-left text-sm font-medium"
            >
              Continue Draft →
            </button>
          </div>
        </div>
      </MotionCard>
    );
  }

  if (!assessment) {
    return null;
  }

  return (
    <MotionCard>
      <Link
        href={`/faculty/subjects/${assessment.subjectId}/assessments/${assessment.id}`}
        className="block"
      >
        <div className="border-border bg-card hover:border-primary/30 rounded-2xl border p-5 transition-all">
          <div className="flex h-full flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {assessment.title}
                </h3>

                <p className="text-muted-foreground mt-1 text-sm">
                  {assessment.section.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    statusColors[assessment.status]
                  }`}
                >
                  {assessment.status}
                </span>

                {assessment.status !== "ONGOING" && assessment.status !== "CANCELLED" && (
                  <div className="relative" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setMenuOpen(!menuOpen);
                      }}
                      className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>

                    {menuOpen && (
                      <div className="bg-popover border-border absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border shadow-md">
                        <div className="p-1">
                          {assessment.status === "COMPLETED" ? (
                            <button
                              onClick={handleArchive}
                              disabled={isArchiving}
                              className="text-destructive hover:bg-destructive/10 w-full rounded-md px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isArchiving
                                ? "Archiving..."
                                : "Archive"}
                            </button>
                          ) : assessment.status === "ARCHIVED" ? (
                            <button
                              onClick={handleRestore}
                              disabled={isRestoring}
                              className="text-foreground hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isRestoring
                                ? "Restoring..."
                                : "Restore"}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={handleEdit}
                                className="text-foreground hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm"
                              >
                                Edit
                              </button>

                              <button
                                onClick={handleArchive}
                                disabled={isArchiving}
                                className="text-destructive hover:bg-destructive/10 w-full rounded-md px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isArchiving
                                  ? "Archiving..."
                                  : "Archive"}
                              </button>

                              {assessment.status === "SCHEDULED" && (
                                <button
                                  onClick={handleCancel}
                                  className="text-destructive hover:bg-destructive/10 w-full rounded-md px-3 py-2 text-left text-sm"
                                >
                                  Cancel
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {assessment.status === "CANCELLED" && (
                  <div className="relative" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setMenuOpen(!menuOpen);
                      }}
                      className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>

                    {menuOpen && (
                      <div className="bg-popover border-border absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border shadow-md">
                        <div className="p-1">
                          <button
                            onClick={handleRestore}
                            disabled={isRestoring}
                            className="text-foreground hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isRestoring
                              ? "Restoring..."
                              : "Restore"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          {/* METRICS */}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricCard
              label="Questions"
              value={assessment._count.examQuestions}
            />

            <MetricCard
              label="Attempts"
              value={assessment._count.attempts}
            />

            <MetricCard
              label="Duration"
              value={`${assessment.duration}m`}
            />

            <MetricCard
              label="Difficulty"
              value={assessment.difficulty}
            />
          </div>

          {/* TIMER */}

          {timeRemaining && (
            <div className="mt-5">
              <p className="text-muted-foreground text-xs">
                {timerLabel}
              </p>

              <p className={`mt-1 text-2xl font-bold ${
                timerLabel.includes("Exam Ended") ? "text-muted-foreground" :
                timerLabel.includes("Time Remaining") ? "text-orange-600" :
                timerLabel.includes("Starts In") ? "text-blue-600" :
                "text-muted-foreground"
              }`}>
                {timeRemaining}
              </p>
            </div>
          )}

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Assessment →
          </div>
        </div>
      </div>
      </Link>
    </MotionCard>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default memo(AssessmentCard);
