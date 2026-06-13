"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  profile: {
    performance: {
      totalAttempts: number;
      passedAttempts: number;
      passRate: number;
      averageScore: number;
    };
  };
}

function StudentPerformanceStats({ profile }: Props) {
  const perf = profile.performance;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Average Score" />

        <InfoCardValue>
          {perf.averageScore.toFixed(1)}%
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Pass Rate" />

        <InfoCardValue>
          {perf.passRate.toFixed(1)}%
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Exam Attempts" />

        <InfoCardValue>
          {perf.totalAttempts}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Passed" />

        <InfoCardValue>
          {perf.passedAttempts}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(StudentPerformanceStats);
