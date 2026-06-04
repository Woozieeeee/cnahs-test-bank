"use client";

import { memo } from "react";

import Link from "next/link";

import type { SectionSubject } from "@/types/section";

import MotionCard from "@/components/motion/motionCard";

import StatusBadge from "@/components/common/badges/statusBadge";

interface Props {
  sectionId: number;

  sectionSubject: SectionSubject;
}

function SectionSubjectCard({
  sectionId,
  sectionSubject,
}: Props) {
  const subject = sectionSubject.subject;

  // MOCKS FOR NOW

  const regularStudents = 42;

  const irregularStudents = 5;

  const hasFaculty = !!subject.faculty;

  return (
    <MotionCard>
      <Link
        href={`/admin/academic/sections/${sectionId}/subjects/${subject.id}`}
        className="border-border bg-background hover:border-primary/30 hover:bg-muted/20 block rounded-2xl border p-5 transition-all"
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {subject.code}
              </p>

              <h3 className="text-foreground mt-1 text-lg font-semibold">
                {subject.name}
              </h3>
            </div>

            <StatusBadge
              variant={hasFaculty ? "success" : "warning"}
            >
              {hasFaculty ? "Assigned" : "Unassigned"}
            </StatusBadge>
          </div>

          {/* FACULTY */}

          <div className="bg-muted/40 mt-5 rounded-xl p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Faculty
            </p>

            <p className="text-foreground mt-2 text-sm font-medium">
              {subject.faculty?.name ??
                "No faculty assigned"}
            </p>
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard
              label="Regular"
              value={regularStudents}
            />

            <MetricCard
              label="Irregular"
              value={irregularStudents}
            />
          </div>

          {/* FOOTER */}

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Subject →
          </div>
        </div>
      </Link>
    </MotionCard>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="text-foreground mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default memo(SectionSubjectCard);
