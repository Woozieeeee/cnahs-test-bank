"use client";

import MotionCard from "@/components/motion/motionCard";

import SectionStatusBadge from "./sectionStatusBadge";

import { ShieldAlert } from "lucide-react";

interface Section {
  id: number;

  name: string;

  students: number;

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

            <p className="mt-1 text-sm text-slate-500">
              {section.students} students
            </p>
          </div>

          <SectionStatusBadge
            active={section.ongoingExam}
          />
        </div>

        {/* STATS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-4
          "
        >
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
        </div>
      </button>
    </MotionCard>
  );
}
