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
      <button className="border-border bg-card hover:border-border/70 w-full rounded-2xl border p-6 text-left transition hover:shadow-md">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground text-xl font-semibold">
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

        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* VIOLATIONS */}

          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Violations
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {section.violations}
            </p>
          </div>

          {/* SUSPICIOUS */}

          <div className="bg-muted/40 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <ShieldAlert
                size={16}
                className="text-amber-500"
              />

              <p className="text-muted-foreground text-sm">
                Suspicious
              </p>
            </div>

            <p className="mt-2 text-2xl font-bold text-amber-600">
              {section.suspicious}
            </p>
          </div>

          {/* TAKING EXAM */}

          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Taking Exam
            </p>

            <p className="text-foreground mt-2 text-2xl font-bold">
              {section.studentsTaking}
            </p>
          </div>

          {/* TOTAL STUDENTS */}

          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Enrolled
            </p>

            <p className="text-foreground mt-2 text-2xl font-bold">
              {section.totalStudents}
            </p>
          </div>
        </div>

        {/* STATUS SUMMARY */}

        <div className="border-border bg-muted/40 mt-6 rounded-xl border p-4">
          <p className="text-foreground text-sm font-medium">
            {section.ongoingExam
              ? "An examination is currently active for this section."
              : "No ongoing examination session."}
          </p>
        </div>
      </button>
    </MotionCard>
  );
}
