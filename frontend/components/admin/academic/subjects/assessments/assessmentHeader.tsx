"use client";

import { memo } from "react";

interface Props {
  subjectName: string;
  subjectCode: string;
}

function AssessmentHeader({
  subjectName,
  subjectCode,
}: Props) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Subject Assessments
      </p>

      <h1 className="mt-1 text-3xl font-bold">
        {subjectName}
      </h1>

      <p className="text-muted-foreground mt-2 text-sm">
        {subjectCode} • Monitor assessment performance
        across all assigned sections.
      </p>
    </div>
  );
}

export default memo(AssessmentHeader);
