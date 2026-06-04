"use client";

import { memo } from "react";

import type { SectionSubject } from "@/types/section";

import SectionSubjectCard from "./sectionSubjectsCard";

interface Props {
  subjects: SectionSubject[];

  sectionId: number;
}

function SectionSubjectsList({
  subjects,
  sectionId,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold">
          Section Subjects
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          View assigned subjects, faculty assignments, and
          curriculum details.
        </p>
      </div>

      {/* GRID */}

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((sectionSubject) => (
          <SectionSubjectCard
            key={sectionSubject.id}
            sectionId={sectionId}
            sectionSubject={sectionSubject}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(SectionSubjectsList);
