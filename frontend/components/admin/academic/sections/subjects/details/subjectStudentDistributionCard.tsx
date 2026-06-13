"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

interface Props {
  regular: number;

  irregular: number;
}

function SubjectStudentDistributionCard({
  regular,
  irregular,
}: Props) {
  return (
    <InfoCard>
      <h3 className="text-lg font-semibold">
        Student Distribution
      </h3>

      <div className="mt-5 space-y-4">
        <Row label="Passing" value={regular} />

        <Row label="Inactive" value={irregular} />

        <Row label="Total" value={regular + irregular} />
      </div>
    </InfoCard>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default memo(SubjectStudentDistributionCard);
