"use client";

import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MotionCard from "@/components/motion/motionCard";
import ExamGuidelinesModal from "@/components/student/exam/examGuidelinesModal";
import { Card } from "@/components/ui/card";
import { Clock, BookOpen, TrendingUp } from "lucide-react";

interface ExamCardProps {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  startsAt: string | null;
  endsAt: string | null;
  canTake: boolean;
  securityConfig?: {
    requireFullscreen: boolean;
    detectTabSwitch: boolean;
    detectWindowBlur: boolean;
    blockCopy: boolean;
    blockPaste: boolean;
    blockRightClick: boolean;
  };
}

function ExamCardComponent({
  id,
  title,
  description,
  duration,
  totalQuestions,
  passingScore,
  startsAt,
  endsAt,
  canTake,
  securityConfig = {
    requireFullscreen: true,
    detectTabSwitch: true,
    detectWindowBlur: true,
    blockCopy: true,
    blockPaste: true,
    blockRightClick: false,
  },
}: ExamCardProps) {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [timerLabel, setTimerLabel] = useState<string>("");
  const [examStatus, setExamStatus] = useState<"AVAILABLE" | "SCHEDULED" | "ENDED">("AVAILABLE");
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  useEffect(() => {
    if (!startsAt || !endsAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const startTime = new Date(startsAt).getTime();
      const endTime = new Date(endsAt).getTime();

      if (now < startTime) {
        // SCHEDULED: Time until exam starts
        const diff = startTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel("Starts In");
        setExamStatus("SCHEDULED");
      } else if (now < endTime) {
        // ONGOING: Time remaining until exam ends
        const diff = endTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        setTimerLabel("Time Remaining");
        setExamStatus("AVAILABLE");
      } else {
        // ENDED: Exam has ended
        setTimeRemaining("00:00:00:00");
        setTimerLabel("Exam Ended");
        setExamStatus("ENDED");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startsAt, endsAt]);

  const handleStartExam = () => {
    setShowGuidelinesModal(true);
  };

  const handleConfirmExam = () => {
    setShowGuidelinesModal(false);
    router.push(`/student/exam/${id}`);
  };

  const handleCancelExam = () => {
    setShowGuidelinesModal(false);
  };

  const getStatusColor = () => {
    if (!canTake || examStatus === "ENDED") {
      return "bg-muted/40 text-muted-foreground opacity-60 cursor-not-allowed";
    }
    if (examStatus === "SCHEDULED") {
      return "bg-primary/10 hover:bg-primary/15 border-primary/30 cursor-pointer";
    }
    return "bg-card hover:bg-card/80 border-primary hover:border-primary/70 cursor-pointer hover:shadow-sm";
  };

  const getTimerColor = () => {
    if (timerLabel === "Exam Ended") return "text-muted-foreground";
    if (timerLabel === "Time Remaining") return "text-orange-600";
    if (timerLabel === "Starts In") return "text-blue-600";
    return "text-muted-foreground";
  };

  return (
    <>
      <MotionCard>
        <div
          onClick={canTake && examStatus === "AVAILABLE" ? handleStartExam : undefined}
          className={`border-2 border-border rounded-2xl p-5 transition-all ${getStatusColor()}`}
        >
        <div className="flex h-full flex-col">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                {title}
              </h3>
              {description && (
                <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                  {description}
                </p>
              )}
            </div>

            <div className="flex-shrink-0">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${
                  !canTake || examStatus === "ENDED"
                    ? "bg-muted text-muted-foreground"
                    : examStatus === "SCHEDULED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {!canTake || examStatus === "ENDED"
                  ? "Not Available"
                  : examStatus === "SCHEDULED"
                  ? "Coming Soon"
                  : "Available"}
              </span>
            </div>
          </div>

          {/* METRICS */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <MetricCard icon={<BookOpen size={16} />} label="Questions" value={totalQuestions} />
            <MetricCard icon={<Clock size={16} />} label="Duration" value={`${duration}m`} />
            <MetricCard icon={<TrendingUp size={16} />} label="Pass Score" value={`${passingScore}%`} />
          </div>

          {/* TIMER */}
          {timeRemaining && (
            <div className="mt-5">
              <p className="text-muted-foreground text-xs">{timerLabel}</p>
              <p className={`mt-1 text-2xl font-bold ${getTimerColor()}`}>{timeRemaining}</p>
            </div>
          )}

          {canTake && examStatus === "AVAILABLE" && (
            <div className="text-primary mt-auto pt-5 text-sm font-medium">
              Take Exam →
            </div>
          )}
        </div>
      </div>
    </MotionCard>

    {/* Guidelines Modal */}
    <ExamGuidelinesModal
      examTitle={title}
      duration={duration}
      totalQuestions={totalQuestions}
      passingScore={passingScore}
      securityFeatures={securityConfig}
      onConfirm={handleConfirmExam}
      onCancel={handleCancelExam}
      visible={showGuidelinesModal}
    />
    </>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-lg p-3 text-center">
      <div className="flex justify-center text-muted-foreground mb-1">
        {icon}
      </div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

export default memo(ExamCardComponent);
