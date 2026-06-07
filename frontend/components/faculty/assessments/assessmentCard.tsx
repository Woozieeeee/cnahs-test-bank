"use client";

import { memo, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import MotionCard from "@/components/motion/motionCard";

import AssessmentDraftCard from "./assessmentDraftCard";
import AssessmentMetricCard from "./assessmentMetricCard";
import AssessmentCardMenu from "./assessmentCardMenu";

import useAssessmentTimer from "./hooks/useAssessmentTimer";
import useAssessmentActions from "./hooks/useAssessmentActions";

import type { Assessment } from "@/types/assessments/assessment";
import type { ExamDraft } from "@/types/exams/examDraft";

interface Props {
  assessment?: Assessment;

  draft?: ExamDraft;

  onContinueDraft?: () => void;
}

function AssessmentCard({
  assessment,
  draft,
  onContinueDraft,
}: Props) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-700",

    SCHEDULED: "bg-blue-100 text-blue-700",

    ONGOING: "bg-green-100 text-green-700",

    COMPLETED: "bg-purple-100 text-purple-700",

    ARCHIVED: "bg-red-100 text-red-700",

    CANCELLED: "bg-orange-100 text-orange-700",
  };

  if (draft) {
    return (
      <AssessmentDraftCard
        draft={draft}
        onContinueDraft={onContinueDraft}
      />
    );
  }

  if (!assessment) {
    return null;
  }

  const timeRemaining = useAssessmentTimer(assessment);

  const {
    handleArchive,
    handleRestore,
    handleCancel,

    isArchiving,
    isRestoring,
    isCancelling,
  } = useAssessmentActions(assessment);

  const handleEdit = () => {
    router.push(
      `/faculty/subjects/${assessment.subjectId}/assessments/${assessment.id}`
    );
  };

  return (
    <MotionCard>
      <div className="border-border bg-card hover:border-primary/30 relative rounded-2xl border p-5 transition-all">
        <Link
          href={`/faculty/subjects/${assessment.subjectId}/assessments/${assessment.id}`}
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 flex h-full flex-col">
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

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setMenuOpen((previous) => !previous);
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
                  <AssessmentCardMenu
                    assessment={assessment}
                    onEdit={handleEdit}
                    onArchive={handleArchive}
                    onRestore={handleRestore}
                    onCancel={handleCancel}
                    isArchiving={isArchiving}
                    isRestoring={isRestoring}
                    isCancelling={isCancelling}
                  />
                )}
              </div>
            </div>
          </div>

          {/* METRICS */}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <AssessmentMetricCard
              label="Questions"
              value={assessment._count.examQuestions}
            />

            <AssessmentMetricCard
              label="Attempts"
              value={assessment._count.attempts}
            />

            <AssessmentMetricCard
              label="Duration"
              value={`${assessment.duration}m`}
            />

            <AssessmentMetricCard
              label="Difficulty"
              value={assessment.difficulty}
            />
          </div>

          {/* TIMER */}

          {timeRemaining && (
            <div className="mt-5">
              <p className="text-muted-foreground text-xs">
                Time Remaining
              </p>

              <p className="mt-1 text-2xl font-bold">
                {timeRemaining}
              </p>
            </div>
          )}

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Assessment →
          </div>
        </div>
      </div>
    </MotionCard>
  );
}

export default memo(AssessmentCard);
