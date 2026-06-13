"use client";

import { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Target } from "lucide-react";
import type { ExamData } from "@/services/student_subject_details_service";

interface ExamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamData | null;
}

function ExamDetailsModalComponent({
  isOpen,
  onClose,
  exam,
}: ExamDetailsModalProps) {
  if (!exam) return null;

  const now = new Date();
  const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
  const isExpired = endsAt && endsAt <= now;
  const isCompleted =
    exam.hasAttempted === true &&
    ["SUBMITTED", "AUTO_SUBMITTED", "COMPLETED"].includes(exam.attemptStatus || "");
  const isUnanswered = isExpired && exam.hasAttempted !== true;

  const passed =
    exam.lastAttemptScore !== undefined &&
    exam.lastAttemptScore > exam.passingScore;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{exam.title}</DialogTitle>
          <DialogDescription className="text-xs">
            Exam Details & Performance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <Badge
              variant={
                isCompleted
                  ? "default"
                  : isUnanswered
                  ? "secondary"
                  : "outline"
              }
              className={`${
                isCompleted
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : isUnanswered
                  ? "bg-amber-100 text-amber-700 border-amber-200"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isCompleted ? "✅ Completed" : isUnanswered ? "⏱️ Not Answered" : "Pending"}
            </Badge>
          </div>

          {/* Important Info Card */}
          <Card className="bg-muted/40 border-muted p-4 space-y-3">
            {/* Score Section (if completed) */}
            {isCompleted && exam.lastAttemptScore !== undefined && (
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {passed ? (
                    <CheckCircle className="text-emerald-600" size={20} />
                  ) : (
                    <AlertCircle className="text-red-600" size={20} />
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="font-semibold text-foreground">
                      {exam.lastAttemptScore}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Pass Score</p>
                  <p className="font-semibold text-foreground">
                    {exam.passingScore}%
                  </p>
                </div>
              </div>
            )}

            {/* Duration Section */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Clock className="text-muted-foreground" size={18} />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">
                  {exam.duration} minute{exam.duration !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Questions Section */}
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Target className="text-muted-foreground" size={18} />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Questions</p>
                <p className="font-semibold text-foreground">
                  {exam.totalQuestions}
                </p>
              </div>
            </div>

            {/* Question Results (if completed) */}
            {isCompleted &&
              exam.correctAnswers !== undefined &&
              exam.wrongAnswers !== undefined &&
              exam.unansweredQuestions !== undefined && (
                <div className="pt-2 border-t border-border/50 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Question Breakdown
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-emerald-500/10 rounded p-2">
                      <p className="text-xs text-emerald-700 font-medium">
                        Correct
                      </p>
                      <p className="text-sm font-bold text-emerald-600">
                        {exam.correctAnswers}
                      </p>
                    </div>
                    <div className="bg-red-500/10 rounded p-2">
                      <p className="text-xs text-red-700 font-medium">Wrong</p>
                      <p className="text-sm font-bold text-red-600">
                        {exam.wrongAnswers}
                      </p>
                    </div>
                    <div className="bg-amber-500/10 rounded p-2">
                      <p className="text-xs text-amber-700 font-medium">
                        Unanswered
                      </p>
                      <p className="text-sm font-bold text-amber-600">
                        {exam.unansweredQuestions}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* Dates Section */}
            <div className="pt-2 border-t border-border/50 space-y-2">
              {exam.startsAt && (
                <div>
                  <p className="text-xs text-muted-foreground">Starts</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(exam.startsAt).toLocaleString()}
                  </p>
                </div>
              )}
              {exam.endsAt && (
                <div>
                  <p className="text-xs text-muted-foreground">Ends</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(exam.endsAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Description (if available) */}
          {exam.description && (
            <div className="border-t border-border/50 pt-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Description
              </p>
              <p className="text-sm text-foreground line-clamp-3">
                {exam.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const ExamDetailsModal = memo(ExamDetailsModalComponent);
