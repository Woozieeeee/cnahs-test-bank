"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  sections: number;

  students: number;

  questions: number;

  assessments: number;
}

function SubjectDetailsStats({
  sections,
  students,
  questions,
  assessments,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Sections" />

        <InfoCardValue>{sections}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Students" />

        <InfoCardValue>{students}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Questions" />

        <InfoCardValue>{questions}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Assessments" />

        <InfoCardValue>{assessments}</InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(SubjectDetailsStats);
