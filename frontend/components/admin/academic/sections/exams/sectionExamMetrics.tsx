import { memo } from "react";

import StatCard from "@/components/common/cards/statCard";

interface Props {
  activeStudents: number;

  completionRate: number;

  violations: number;
}

function SectionExamMetrics({
  activeStudents,
  completionRate,
  violations,
}: Props) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      <StatCard
        compact
        label="Students"
        value={activeStudents}
      />

      <StatCard
        compact
        label="Completion"
        value={`${completionRate}%`}
      />

      <StatCard
        compact
        label="Violations"
        value={violations}
      />
    </div>
  );
}

export default memo(SectionExamMetrics);
