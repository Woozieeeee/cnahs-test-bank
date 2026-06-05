"use client";

import { memo } from "react";

import BackButton from "@/components/common/backButton";

import type { Subject } from "@/types/academic/subject";

interface Props {
  sectionId: number;

  subject: Subject;
}

function SubjectDetailsHeader({
  sectionId,
  subject,
}: Props) {
  return (
    <div className="space-y-4">
      <BackButton
        href={`/admin/academic/sections/${sectionId}/subjects`}
        label="Back to Subjects"
      />

      <div>
        <p className="text-muted-foreground text-sm font-medium">
          {subject.code}
        </p>

        <h1 className="text-foreground mt-1 text-3xl font-bold">
          {subject.name}
        </h1>

        <p className="text-muted-foreground mt-2">
          View subject performance, exams, and enrolled
          students.
        </p>
      </div>
    </div>
  );
}

export default memo(SubjectDetailsHeader);
