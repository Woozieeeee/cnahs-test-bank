"use client";

import { memo } from "react";

interface Props {
  faculties: {
    id: number;
    name: string;
  }[];

  sections: number;

  students: number;
}

function SubjectFacultyOverview({
  faculties,
  sections,
  students,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Faculty Pool
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Faculty members authorized to teach this subject.
      </p>

      <div className="mt-6 space-y-3">
        {faculties.length === 0 ? (
          <div className="border-border bg-muted/30 rounded-xl border border-dashed p-4">
            <p className="text-muted-foreground text-sm">
              No faculty assigned.
            </p>
          </div>
        ) : (
          faculties.map((assignment) => {
            const name = assignment.name;

            const initials = name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={assignment.id}
                className="border-border flex items-center gap-3 rounded-xl border p-3"
              >
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  {initials}
                </div>

                <p className="font-medium">{name}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <MetricCard
          label="Faculty Members"
          value={faculties.length}
        />

        <MetricCard label="Sections" value={sections} />

        <MetricCard label="Students" value={students} />
      </div>
    </div>
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

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default memo(SubjectFacultyOverview);
