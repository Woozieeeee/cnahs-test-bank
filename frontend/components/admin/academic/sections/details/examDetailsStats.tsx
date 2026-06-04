import { memo } from "react";

import StatCard from "@/components/common/cards/statCard";

interface Props {
  difficulty: string;

  duration: number;

  activeStudents: number;

  violations: number;
}

function ExamDetailsStats({
  difficulty,
  duration,
  activeStudents,
  violations,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard label="Difficulty" value={difficulty} />

      <StatCard
        label="Duration"
        value={`${duration} mins`}
      />

      <StatCard
        label="Active Students"
        value={activeStudents}
      />

      <StatCard label="Violations" value={violations} />
    </div>
  );
}

export default memo(ExamDetailsStats);
