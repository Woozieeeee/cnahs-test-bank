"use client";

import { memo } from "react";
import type { Subject } from "@/types/subject";
import BackButton from "@/components/common/backButton";

interface Props {
  sectionId: number;

  subject: Subject;
}

function SubjectAssessmentsHeader({
  sectionId,
  subject,
}: Props) {
  return (
    <div className="space-y-4">
      <BackButton
        href={`/admin/academic/sections/${sectionId}/subjects/${subject.id}`}
        label="Back to Subject"
      />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            Assessments
          </p>

          <h1 className="text-3xl font-bold">
            {subject.name}
          </h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Assessment analytics and management.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SubjectAssessmentsHeader);
