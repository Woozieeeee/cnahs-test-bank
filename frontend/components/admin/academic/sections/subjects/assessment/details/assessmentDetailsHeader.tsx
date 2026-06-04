"use client";

import { memo } from "react";

interface Props {
  title: string;

  difficulty: string;

  status: string;
}

function AssessmentDetailsHeader({
  title,
  difficulty,
  status,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-muted-foreground text-sm">
          Assessment Details
        </p>

        <h1 className="text-3xl font-bold">{title}</h1>

        <div className="mt-2 flex gap-2">
          <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
            {difficulty}
          </span>

          <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(AssessmentDetailsHeader);
