"use client";

import { memo } from "react";

import Link from "next/link";

import type { Exam } from "@/types/assessments/exam";

import SectionExamCard from "./sectionExamsCard";

interface Props {
  exams: Exam[];

  sectionId: number;
}

function SectionExamsList({ exams, sectionId }: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold">
          Section Exams
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          View and monitor examinations assigned to this
          section.
        </p>
      </div>

      {/* GRID */}

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {exams.map((exam) => (
          <Link
            key={exam.id}
            href={`/admin/academic/sections/${sectionId}/exams/${exam.id}`}
            className="block h-full"
          >
            <SectionExamCard exam={exam} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(SectionExamsList);
