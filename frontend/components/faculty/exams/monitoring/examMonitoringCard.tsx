"use client";

import { memo, useEffect, useState } from "react";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import type { Exam } from "@/types/exams/examMonitoring";

function ExamMonitoringCard({ exam }: { exam: Exam }) {
  const statusColors: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    ONGOING: "bg-green-100 text-green-700",
    COMPLETED: "bg-purple-100 text-purple-700",
  };

  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [timerLabel, setTimerLabel] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>(exam.status);

  useEffect(() => {
    if (!exam.startsAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const startTime = new Date(exam.startsAt!).getTime();
      const endTime = exam.endsAt ? new Date(exam.endsAt).getTime() : startTime + exam.duration * 60 * 1000;

      if (now < startTime) {
        setCurrentStatus("SCHEDULED");
        const diff = startTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel("SCHEDULED - Starts In");
      } else if (now < endTime) {
        setCurrentStatus("ONGOING");
        const diff = endTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel("ONGOING - Time Remaining");
      } else {
        setCurrentStatus("COMPLETED");
        setTimeRemaining("00:00:00:00");
        setTimerLabel("COMPLETED - Exam Ended");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [exam]);

  const getTimerColor = () => {
    if (timerLabel.includes("Exam Ended")) return "text-muted-foreground";
    if (timerLabel.includes("Time Remaining")) return "text-orange-600";
    if (timerLabel.includes("Starts In")) return "text-blue-600";
    return "text-muted-foreground";
  };

  return (
    <MotionCard>
     <Link
    href={`/faculty/exams/${exam.id}`}
  className="block"
>
        <div className="border-border bg-card hover:border-primary/30 rounded-2xl border p-5 transition-all">
          <div className="flex h-full flex-col">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {exam.title}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {exam.subjectName} • {exam.sectionName}
                </p>
              </div>

              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[currentStatus] || statusColors.SCHEDULED}`}
              >
                {currentStatus}
              </span>
            </div>

            {/* METRICS */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <MetricCard label="Questions" value={exam.totalQuestions} />
              <MetricCard label="Attempts" value={exam.totalAttempts} />
              <MetricCard label="Duration" value={`${exam.duration}m`} />
              <MetricCard label="Risk" value={exam.riskLevel || "N/A"} />
            </div>

            {/* TIMER */}
            {timeRemaining && (
              <div className="mt-5">
                <p className="text-muted-foreground text-xs">{timerLabel}</p>
                <p className={`mt-1 text-2xl font-bold ${getTimerColor()}`}>{timeRemaining}</p>
              </div>
            )}

            <div className="text-primary mt-auto pt-5 text-sm font-medium">
              View Exam →
            </div>
          </div>
        </div>
      </Link>
    </MotionCard>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default memo(ExamMonitoringCard);
