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
          border-slate-200
          bg-white
          p-6
          text-left
          transition
          hover:border-slate-300
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
                text-slate-900
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
      bg-slate-50
      p-4
    "
          >
            <p className="text-sm text-slate-500">
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
      bg-slate-50
      p-4
    "
          >
            <div className="flex items-center gap-2">
              <ShieldAlert
                size={16}
                className="text-amber-500"
              />

              <p className="text-sm text-slate-500">
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
      bg-slate-50
      p-4
    "
          >
            <p className="text-sm text-slate-500">
              Taking Exam
            </p>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-slate-900
      "
            >
              {section.studentsTaking}
            </p>
          </div>

          {/* TOTAL STUDENTS */}

          <div
            className="
      rounded-xl
      bg-slate-50
      p-4
    "
          >
            <p className="text-sm text-slate-500">
              Enrolled
            </p>

            <p
              className="
        mt-2
        text-2xl
        font-bold
        text-slate-900
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
    border-slate-200
    bg-slate-50
    p-4
  "
        >
          <p
            className="
      text-sm
      font-medium
      text-slate-700
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
