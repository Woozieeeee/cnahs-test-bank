"use client";

import MotionCard from "@/components/motion/motionCard";

import SectionStatusBadge from "./sectionStatusBadge";

import { ShieldAlert } from "lucide-react";

interface Section {
  id: number;

  name: string;

  totalStudents: number;

  studentsTaking: number;

  ongoingExam: boolean;

  violations: number;

  suspicious: number;
}

interface Props {
  section: Section;
}

export default function SectionCard({ section }: Props) {
  return (
    <MotionCard>
      <button
        className="
          w-full
          rounded-2xl
          border
          border-border
          bg-card
          p-6
          text-left
          transition
          hover:border-border/70
          hover:shadow-md
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-foreground
              "
            >
              {section.name}
            </h2>
          </div>

          <SectionStatusBadge
            active={section.ongoingExam}
            hasViolations={section.violations > 0}
            hasSuspicious={section.suspicious > 0}
          />
        </div>

        {/* STATS */}

        {/* STATS */}

        <div
          className="
    mt-6
    grid
    grid-cols-2
    gap-4
  "
        >
          {/* VIOLATIONS */}

      <div
        className="
      rounded-xl
      bg-muted/40
      p-4
    "
      >
            <p className="text-sm text-muted-foreground">
              Violations
            </p>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-red-600
      "
            >
              {section.violations}
            </p>
          </div>

          {/* SUSPICIOUS */}

      <div
        className="
      rounded-xl
      bg-muted/40
      p-4
    "
      >
            <div className="flex items-center gap-2">
              <ShieldAlert
                size={16}
                className="text-amber-500"
              />

              <p className="text-sm text-muted-foreground">
                Suspicious
              </p>
            </div>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-amber-600
      "
            >
              {section.suspicious}
            </p>
          </div>

          {/* TAKING EXAM */}

      <div
        className="
      rounded-xl
      bg-muted/40
      p-4
    "
      >
            <p className="text-sm text-muted-foreground">
              Taking Exam
            </p>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-foreground
      "
            >
              {section.studentsTaking}
            </p>
          </div>

          {/* TOTAL STUDENTS */}

      <div
        className="
      rounded-xl
      bg-muted/40
      p-4
    "
      >
            <p className="text-sm text-muted-foreground">
              Enrolled
            </p>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-foreground
      "
            >
              {section.totalStudents}
            </p>
          </div>
        </div>

        {/* STATUS SUMMARY */}

  <div
          className="
    mt-6
    rounded-xl
    border
    border-border
    bg-muted/40
    p-4
  "
        >
          <p
            className="
      text-sm
      font-medium
      text-foreground
    "
          >
            {section.ongoingExam
              ? "An examination is currently active for this section."
              : "No ongoing examination session."}
          </p>
        </div>
      </button>
    </MotionCard>
  );
}
