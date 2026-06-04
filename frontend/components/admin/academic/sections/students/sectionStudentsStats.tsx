"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  total: number;

  regular: number;

  irregular: number;

  atRisk: number;
}

function SectionStudentsStats({
  total,
  regular,
  irregular,
  atRisk,
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
        <InfoCardHeader label="Regular" />

        <InfoCardValue className="text-3xl font-bold">
          {regular}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Irregular" />

        <InfoCardValue className="text-3xl font-bold">
          {irregular}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="At Risk" />

        <InfoCardValue className="text-3xl font-bold text-red-600">
          {atRisk}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(SectionStudentsStats);
