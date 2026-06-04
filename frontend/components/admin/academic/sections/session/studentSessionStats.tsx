import { memo } from "react";

import { mockStudentSession } from "@/components/admin/academic/sections/data/mockStudentSession";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

function StudentSessionStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <InfoCard>
        <InfoCardHeader label="Student" />

        <InfoCardValue>
          {mockStudentSession.name}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Student ID" />

        <InfoCardValue>
          {mockStudentSession.studentId}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Status" />

        <div className="mt-2 flex items-center justify-between gap-3">
          <InfoCardValue className="mt-0">
            {mockStudentSession.status}
          </InfoCardValue>

          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
            LIVE
          </span>
        </div>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Progress" />

        <InfoCardValue>
          {mockStudentSession.progress}%
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Warnings" />

        <InfoCardValue>
          {mockStudentSession.warnings}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Risk Level" />

        <InfoCardValue>
          {mockStudentSession.risk}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(StudentSessionStats);
