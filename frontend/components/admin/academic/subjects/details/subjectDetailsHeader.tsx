"use client";

import { memo } from "react";

import type { Subject } from "@/types/subject";

interface Props {
  subject: Subject;
}

function SubjectDetailsHeader({ subject }: Props) {
  const hasFaculty = (subject.faculties?.length ?? 0) > 0;

  return (
    <div className="border-border bg-card rounded-2xl border p-8">
      <p className="text-muted-foreground text-sm font-medium">
        {subject.code}
      </p>

      <h1 className="text-foreground mt-2 text-3xl font-bold">
        {subject.name}
      </h1>

      <p className="text-muted-foreground mt-3 max-w-3xl">
        {subject.description || "No description available."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            subject.isArchived
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {subject.isArchived ? "Archived" : "Active"}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            hasFaculty
              ? `bg-blue-100 text-blue-700`
              : `bg-amber-100 text-amber-700`
          } `}
        >
          {hasFaculty
            ? "Faculty Assigned"
            : "Faculty Unassigned"}
        </span>
      </div>
    </div>
  );
}

export default memo(SubjectDetailsHeader);
