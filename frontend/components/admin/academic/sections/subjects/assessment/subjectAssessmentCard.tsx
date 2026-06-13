"use client";

import { memo, useState, useEffect } from "react";

import Link from "next/link";

import RestoreAssessmentModal from "./modals/restoreAssessmentModal";

interface Assessment {
  id: number;

  title: string;

  difficulty: string;

  status: string;

  averageScore: number;

  passRate: number;

  violations: number;

  totalStudents: number;

  createdAt: string;

  duration?: number;

  startsAt?: string;

  endsAt?: string;
}

interface Props {
  sectionId: number;

  subjectId: number;

  assessment: Assessment;
}

function SubjectAssessmentCard({
  sectionId,
  subjectId,
  assessment,
}: Props) {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [timerColor, setTimerColor] = useState<string>("");
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // ==========================================
  // TIMER HOOK FOR ONGOING & SCHEDULED ASSESSMENTS
  // ==========================================
  useEffect(() => {
    // Only run for ONGOING or SCHEDULED assessments with time
    if (
      (assessment.status !== "ONGOING" &&
        assessment.status !== "SCHEDULED") ||
      !assessment.endsAt
    ) {
      setRemainingTime("");
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = new Date(assessment.endsAt!).getTime();
      const diff = Math.max(0, endTime - now);

      // Format HH:MM:SS or MM:SS based on time remaining
      if (diff <= 0) {
        setRemainingTime("00:00:00");
        setTimerColor("text-destructive font-bold");
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        if (hours > 0) {
          const formatted = `${hours}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          setRemainingTime(formatted);
        } else {
          const formatted = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
          setRemainingTime(formatted);
        }

        // Color based on urgency
        const totalMinutes = diff / 60000;
        if (totalMinutes <= 5) {
          setTimerColor(
            "text-destructive animate-pulse font-bold"
          );
        } else if (totalMinutes <= 15) {
          setTimerColor("text-amber-600 font-bold");
        } else {
          setTimerColor("text-green-600 font-bold");
        }
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [assessment.status, assessment.endsAt]);

  // ==========================================
  // RESTORE HANDLER FOR CANCELLED ASSESSMENTS
  // ==========================================
  const handleRestoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRestoreModal(true);
  };

  const handleRestoreSubmit = async (newDateTime: string) => {
    setIsRestoring(true);
    try {
      // TODO: Call API endpoint to restore assessment with new date/time
      // const response = await fetch(
      //   `/api/admin/assessments/${assessment.id}/restore`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ newDateTime }),
      //   }
      // );
      // if (!response.ok) throw new Error("Failed to restore assessment");
      console.log("Restoring assessment:", assessment.id, "at", newDateTime);
      setShowRestoreModal(false);
      // Optionally refresh the page or list
    } catch (error) {
      console.error("Failed to restore assessment:", error);
    } finally {
      setIsRestoring(false);
    }
  };

  // ==========================================
  // STATUS COLOR MAPPING
  // ==========================================
  const statusColor =
    assessment.status === "ONGOING"
      ? "bg-amber-500"
      : assessment.status === "CANCELLED"
      ? "bg-red-500"
      : "bg-emerald-500";

  // For CANCELLED status, don't make it a link
  if (assessment.status === "CANCELLED") {
    return (
      <>
        <div className="border-border bg-card rounded-2xl border p-6">
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-foreground font-semibold">
                {assessment.title}
              </h3>

              <p className="text-muted-foreground mt-1 text-sm">
                {assessment.difficulty}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${statusColor}`}
              />

              <span className="text-muted-foreground text-xs font-medium">
                {assessment.status}
              </span>
            </div>
          </div>

          {/* METRICS */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Metric
              label="Average"
              value={`${assessment.averageScore}%`}
            />

            <Metric
              label="Pass Rate"
              value={`${assessment.passRate}%`}
            />

            <Metric
              label="Violations"
              value={assessment.violations}
            />
          </div>

          {/* FOOTER WITH RESTORE BUTTON */}
          <div className="border-border text-primary mt-6 border-t pt-4">
            <button
              onClick={handleRestoreClick}
              disabled={isRestoring}
              className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isRestoring ? "⏳ Restoring..." : "↻ Restore Assessment"}
            </button>
          </div>
        </div>
        <RestoreAssessmentModal
          isOpen={showRestoreModal}
          assessmentTitle={assessment.title}
          onClose={() => setShowRestoreModal(false)}
          onSubmit={handleRestoreSubmit}
          isLoading={isRestoring}
        />
      </>
    );
  }

  // For other statuses, make it a link
  return (
    <Link
      href={`/admin/academic/sections/${sectionId}/subjects/${subjectId}/assessment/${assessment.id}`}
      className="block"
    >
      <div className="border-border bg-card hover:border-ring rounded-2xl border p-6 transition-all duration-200 hover:shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-foreground font-semibold">
              {assessment.title}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              {assessment.difficulty}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${statusColor}`}
            />

            <span className="text-muted-foreground text-xs font-medium">
              {assessment.status}
            </span>
          </div>
        </div>

        {/* TIMER FOR ONGOING & SCHEDULED */}
        {(assessment.status === "ONGOING" ||
          assessment.status === "SCHEDULED") &&
          remainingTime && (
            <div className={`mt-3 text-sm ${timerColor}`}>
              ⏱️ Time Remaining: {remainingTime}
              {remainingTime.includes(":") &&
                parseInt(remainingTime.split(":")[0]) <= 5 && (
                  <span className="ml-2 text-xs">
                    ⚠️ Running out of time!
                  </span>
                )}
            </div>
          )}

        {/* METRICS */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Metric
            label="Average"
            value={`${assessment.averageScore}%`}
          />

          <Metric
            label="Pass Rate"
            value={`${assessment.passRate}%`}
          />

          <Metric
            label="Violations"
            value={assessment.violations}
          />
        </div>

        {/* FOOTER */}
        <div className="border-border text-primary mt-6 border-t pt-4 text-sm font-medium">
          View Assessment →
        </div>
      </div>
    </Link>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-3 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

export default memo(SubjectAssessmentCard);
