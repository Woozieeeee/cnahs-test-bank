"use client";

import { memo } from "react";

interface Props {
  label: string;
  value: string | number;
}

function PreviewMetricCard({ label, value }: Props) {
  return (
    <div className="bg-muted/40 rounded-xl p-5 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="text-foreground mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default memo(PreviewMetricCard);
