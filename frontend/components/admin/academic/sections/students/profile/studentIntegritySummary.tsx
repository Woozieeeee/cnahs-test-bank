"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

import StatCard from "@/components/common/cards/statCard";

import { mockStudentProfile } from "@/components/admin/academic/sections/data/mockStudentProfile";

function StudentIntegritySummary() {
  const integrityRating =
    mockStudentProfile.terminatedSessions > 0
      ? "Poor"
      : mockStudentProfile.flaggedSessions > 2
        ? "Warning"
        : "Excellent";

  return (
    <InfoCard>
      <div>
        <h2 className="text-lg font-semibold">
          Integrity Summary
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Overall academic integrity indicators.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <StatCard
          compact
          label="Violations"
          value={mockStudentProfile.violations}
        />

        <StatCard
          compact
          label="Flagged"
          value={mockStudentProfile.flaggedSessions}
        />

        <StatCard
          compact
          label="Terminated"
          value={mockStudentProfile.terminatedSessions}
        />

        <StatCard
          compact
          label="Rating"
          value={integrityRating}
        />
      </div>
    </InfoCard>
  );
}

export default memo(StudentIntegritySummary);
