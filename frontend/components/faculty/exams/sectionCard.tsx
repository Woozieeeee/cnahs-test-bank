"use client";

import { memo } from "react";

import MotionCard from "@/components/motion/motionCard";

import type { FacultySectionStats } from "@/types/faculty/facultySectionStats";

interface Props {
  section: FacultySectionStats;
  onClick: () => void;
  isSelected?: boolean;
}

function SectionCard({ section, onClick, isSelected }: Props) {
  return (
    <MotionCard>
      <div
        onClick={onClick}
        className={`border-border hover:border-primary/30 relative cursor-pointer rounded-2xl border p-6 transition-all ${
          isSelected ? "border-primary bg-primary/5" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{section.name}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {section.totalExams} exam{section.totalExams !== 1 ? "s" : ""}
            </p>
          </div>
          {isSelected && (
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-muted-foreground text-xs">
              Scheduled
            </p>
            <p className="mt-1 text-lg font-bold">
              {section.scheduledExams}
            </p>
          </div>

          <div className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-muted-foreground text-xs">
              Ongoing
            </p>
            <p className="mt-1 text-lg font-bold">
              {section.ongoingExams}
            </p>
          </div>

          <div className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-muted-foreground text-xs">
              Completed
            </p>
            <p className="mt-1 text-lg font-bold">
              {section.completedExams}
            </p>
          </div>

          <div className="bg-muted/40 rounded-xl p-3 text-center">
            <p className="text-muted-foreground text-xs">
              Avg Score
            </p>
            <p className="mt-1 text-lg font-bold">
              {section.averageScore}%
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
          <span className="text-muted-foreground">
            {section.totalAttempts} attempts
          </span>
          <span className="text-muted-foreground">
            {section.totalQuestions} questions
          </span>
        </div>
      </div>
    </MotionCard>
  );
}

export default memo(SectionCard);
