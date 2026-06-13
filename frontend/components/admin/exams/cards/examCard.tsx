"use client";

import { memo } from "react";
import { Clock, Users, AlertCircle, CheckCircle2, BookOpen } from "lucide-react";
import MotionCard from "@/components/motion/motionCard";
import { format } from "date-fns";

interface ExamData {
  id: number;
  title: string;
  code: string;
  subject: string;
  status: string;
  difficulty: string;
  startsAt: string | null;
  endsAt: string | null;
  totalQuestions: number;
  totalAttempts: number;
  totalViolations: number;
  unresolvedViolations: number;
}

interface Props {
  exam: ExamData;
  onViewViolations?: (examId: number) => void;
}

function ExamCard({ exam, onViewViolations }: Props) {
  const isActive = exam.status === "ONGOING" || exam.status === "IN_PROGRESS";
  const hasViolations = exam.totalViolations > 0;
  const hasUnresolvedViolations = exam.unresolvedViolations > 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-700";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      case "HARD":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONGOING":
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <MotionCard>
      <div className="bg-card border-border hover:border-ring rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-card-foreground text-lg font-semibold">
              {exam.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {exam.code} • {exam.subject}
            </p>
          </div>

          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(exam.difficulty)}`}>
              {exam.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exam.status)}`}>
              {exam.status}
            </span>
          </div>
        </div>

        {/* STATUS INDICATOR */}
        {isActive && (
          <div className="mb-4 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-700">Exam is currently active</span>
          </div>
        )}

        {/* TIMING */}
        <div className="mb-4 space-y-2 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-muted-foreground">Starts:</p>
              <p className="text-foreground font-medium">{formatDate(exam.startsAt)}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-muted-foreground">Ends:</p>
              <p className="text-foreground font-medium">{formatDate(exam.endsAt)}</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Questions</p>
            <p className="mt-1 text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={16} />
              {exam.totalQuestions}
            </p>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">Attempts</p>
            <p className="mt-1 text-xl font-bold text-foreground flex items-center gap-2">
              <Users size={16} />
              {exam.totalAttempts}
            </p>
          </div>
        </div>

        {/* VIOLATIONS */}
        {hasViolations ? (
          <button
            onClick={() => onViewViolations?.(exam.id)}
            className="w-full flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600" />
              <span className="text-sm font-semibold text-red-700">
                {exam.totalViolations} violation{exam.totalViolations !== 1 ? "s" : ""}
              </span>
            </div>
            {hasUnresolvedViolations && (
              <span className="text-xs font-bold px-2 py-1 bg-red-200 text-red-800 rounded">
                {exam.unresolvedViolations} unresolved
              </span>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              No violations
            </span>
          </div>
        )}
      </div>
    </MotionCard>
  );
}

export default memo(ExamCard);
