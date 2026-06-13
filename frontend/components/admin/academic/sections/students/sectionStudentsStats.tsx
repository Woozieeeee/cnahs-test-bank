"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  total: number;

  passing: number;

  inactive: number;

  struggling: number;
}

function SectionStudentsStats({
  total,
  passing,
  inactive,
  struggling,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Total Students" />

        <InfoCardValue className="text-3xl font-bold">
          {total}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Passing" />

        <InfoCardValue className="text-3xl font-bold text-green-600">
          {passing}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Inactive" />

        <InfoCardValue className="text-3xl font-bold text-yellow-600">
          {inactive}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Struggling" />

        <InfoCardValue className="text-3xl font-bold text-red-600">
          {struggling}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(SectionStudentsStats);
