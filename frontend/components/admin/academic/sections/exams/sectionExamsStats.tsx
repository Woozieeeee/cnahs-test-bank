"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  total: number;

  scheduled: number;

  ongoing: number;

  completed: number;
}

function SectionExamsStats({
  total,
  scheduled,
  ongoing,
  completed,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Total Exams" />

        <InfoCardValue>{total}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Scheduled" />

        <InfoCardValue>{scheduled}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Ongoing" />

        <InfoCardValue className="text-green-600">
          {ongoing}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Completed" />

        <InfoCardValue>{completed}</InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(SectionExamsStats);
