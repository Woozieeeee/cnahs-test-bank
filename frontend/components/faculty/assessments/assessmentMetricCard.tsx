"use client";

import { memo } from "react";

interface Props {
  label: string;
  value: string | number;
}

function AssessmentMetricCard({ label, value }: Props) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

export default memo(AssessmentMetricCard);
