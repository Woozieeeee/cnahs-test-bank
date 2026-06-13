"use client";

import { memo } from "react";

import Link from "next/link";

interface Props {
  student: any;

  sectionId: number;
}

function SectionStudentRosterItem({
  student,
  sectionId,
}: Props) {
  const initials = student.name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/admin/academic/sections/${sectionId}/students/${student.id}`}
      className="border-border bg-background hover:border-primary/30 hover:bg-muted/20 block rounded-2xl border p-5 transition-all"
    >
      <div className="space-y-5">
        {/* HEADER */}

        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold">
            {initials}
          </div>

          <div>
            <h3 className="text-foreground font-semibold">
              {student.name}
            </h3>

            <p className="text-muted-foreground text-sm">
              {student.studentId}
            </p>
          </div>
        </div>

        {/* ACADEMIC PERFORMANCE */}

        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Average Grade
          </p>

          <div className="mt-2">
            <div className="flex justify-between text-sm">
              <span>{student.averageGrade}%</span>

              <span>{student.rank}</span>
            </div>

            <div className="bg-muted mt-2 h-2.5 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full"
                style={{
                  width: `${student.averageGrade}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* PERFORMANCE */}

        <div className="bg-muted/40 rounded-xl p-4">
          <p className="text-muted-foreground text-xs">
            Strongest Subject
          </p>

          <p className="mt-1 font-semibold">
            {student.bestSubject}
          </p>
        </div>

        {/* ACTION */}

        <div className="text-primary text-sm font-medium">
          Open Profile →
        </div>
      </div>
    </Link>
  );
}

export default memo(SectionStudentRosterItem);
