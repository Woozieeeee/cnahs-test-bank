"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

import { mockStudentProfile } from "@/components/admin/academic/sections/data/mockStudentProfile";

function StudentPerformanceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Average Grade" />

        <InfoCardValue>
          {mockStudentProfile.averageGrade}%
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Attendance" />

        <InfoCardValue>
          {mockStudentProfile.attendance}%
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Assessments" />

        <InfoCardValue>
          {mockStudentProfile.totalAssessments}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Passed Subjects" />

        <InfoCardValue>
          {mockStudentProfile.passedSubjects}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(StudentPerformanceStats);
