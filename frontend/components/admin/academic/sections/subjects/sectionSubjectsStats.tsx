"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  totalSubjects: number;

  assignedFaculty: number;

  withExams: number;

  withoutFaculty: number;
}

function SectionSubjectsStats({
  totalSubjects,
  assignedFaculty,
  withExams,
  withoutFaculty,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Subjects" />
        <InfoCardValue>{totalSubjects}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Faculty Assigned" />
        <InfoCardValue>{assignedFaculty}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="With Exams" />
        <InfoCardValue>{withExams}</InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Unassigned" />
        <InfoCardValue className="text-amber-600">
          {withoutFaculty}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(SectionSubjectsStats);
