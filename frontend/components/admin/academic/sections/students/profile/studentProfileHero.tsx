"use client";

import { memo } from "react";

import { mockStudentProfile } from "@/components/admin/academic/sections/data/mockStudentProfile";

function StudentProfileHero() {
  const initials = mockStudentProfile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="from-primary/15 via-primary/5 to-background h-40 bg-gradient-to-r" />

      <div className="relative px-8 pb-8">
        <div className="border-card bg-primary text-primary-foreground absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-4 text-2xl font-bold">
          {initials}
        </div>

        <div className="pt-16">
          <h1 className="text-2xl font-bold">
            {mockStudentProfile.name}
          </h1>

          <p className="text-muted-foreground">
            {mockStudentProfile.studentId}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {mockStudentProfile.status}
            </span>

            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
              {mockStudentProfile.honorStatus}
            </span>
          </div>

          <div className="border-border mt-6 grid gap-4 border-t pt-6 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-xs">
                Program
              </p>

              <p className="font-medium">
                {mockStudentProfile.program}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Section
              </p>

              <p className="font-medium">
                {mockStudentProfile.section}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Rank
              </p>

              <p className="font-medium">
                {mockStudentProfile.rank}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StudentProfileHero);
