"use client";

import { memo } from "react";

import SectionStudentRosterItem from "./sectionStudentRosterItem";

interface Props {
  students: any[];

  sectionId: number;
}

function SectionStudentRoster({
  students,
  sectionId,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Student Profiles
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Academic performance overview and student
          analytics.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {students.map((student) => (
          <SectionStudentRosterItem
            key={student.id}
            student={student}
            sectionId={sectionId}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(SectionStudentRoster);
