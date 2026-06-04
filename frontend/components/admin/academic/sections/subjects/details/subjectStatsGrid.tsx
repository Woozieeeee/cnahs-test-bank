"use client";

import { memo } from "react";

import StatCard from "@/components/common/cards/statCard";

interface Props {
  averageScore: number;

  passingRate: number;

  highestScore: number;

  lowestScore: number;
}

function SubjectStatsGrid({
  averageScore,
  passingRate,
  highestScore,
  lowestScore,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Average Score"
        value={`${averageScore}%`}
      />

      <StatCard
        label="Passing Rate"
        value={`${passingRate}%`}
      />

      <StatCard
        label="Highest Score"
        value={`${highestScore}%`}
      />

      <StatCard
        label="Lowest Score"
        value={`${lowestScore}%`}
      />
    </div>
  );
}

export default memo(SubjectStatsGrid);
