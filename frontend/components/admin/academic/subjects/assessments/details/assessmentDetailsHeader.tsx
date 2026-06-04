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
    <div>
      <p className="text-muted-foreground text-sm">
        Assessment Details
      </p>

      <h1 className="mt-1 text-3xl font-bold">{title}</h1>

      <div className="mt-3 flex gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {difficulty}
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {status}
        </span>
      </div>
    </div>
  );
}

export default memo(AssessmentDetailsHeader);
