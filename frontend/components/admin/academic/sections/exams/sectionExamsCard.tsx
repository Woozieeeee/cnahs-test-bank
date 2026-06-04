"use client";

import { memo } from "react";

import type { Exam } from "@/types/exam";

import StatCard from "@/components/common/cards/statCard";
import CardFooterLink from "@/components/common/cards/cardFooterLink";

import ExamStatusBadge from "@/components/admin/exams/examStatusBadge";

interface Props {
  exam: Exam;
}

function SectionExamCard({ exam }: Props) {
  return (
    <div className="border-border bg-card hover:border-ring flex h-full flex-col rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-foreground text-lg font-semibold">
            {exam.title}
          </h2>

          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {exam.description}
          </p>
        </div>

        <ExamStatusBadge status={exam.status} />
      </div>

      {/* STATS */}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatCard
          compact
          label="Difficulty"
          value={exam.difficulty}
        />

        <StatCard
          compact
          label="Duration"
          value={`${exam.duration}m`}
        />

        <StatCard compact label="Students" value={18} />

        <StatCard compact label="Violations" value={3} />
      </div>

      {/* FOOTER */}

      <div className="mt-auto">
        <CardFooterLink label="View Exam Details" />
      </div>
    </div>
  );
}

export default memo(SectionExamCard);
