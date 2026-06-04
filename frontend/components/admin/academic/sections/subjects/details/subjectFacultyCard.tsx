"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

import InfoCardHeader from "@/components/common/cards/infoCardHeader";

import InfoCardValue from "@/components/common/cards/infoCardValue";

import type { Subject } from "@/types/subject";

interface Props {
  subject: Subject;
}

function SubjectFacultyCard({ subject }: Props) {
  const facultyName =
    subject.faculties?.[0]?.faculty.name ??
    subject.faculty?.name ??
    "No Faculty Assigned";

  const hasFaculty =
    !!subject.faculties?.length || !!subject.faculty;

  return (
    <InfoCard>
      <InfoCardHeader label="Faculty Assignment" />

      <InfoCardValue>
        {facultyName}
      </InfoCardValue>

      <p className="text-muted-foreground mt-2 text-sm">
        {hasFaculty
          ? "Currently assigned to this subject."
          : "This subject requires faculty assignment."}
      </p>
    </InfoCard>
  );
}

export default memo(SubjectFacultyCard);
