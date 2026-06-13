"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import StatCard from "@/components/common/cards/statCard";

interface Props {
  profile: {
    recentViolations: Array<{
      id: number;
      type: string;
      severity: string;
      description: string;
      resolved: boolean;
      timestamp: string;
    }>;
  };
}

function StudentIntegritySummary({ profile }: Props) {
  const violations = profile.recentViolations;
  const totalViolations = violations.length;
  const unresolvedViolations = violations.filter((v) => !v.resolved).length;

  const integrityRating =
    unresolvedViolations > 2
      ? "Poor"
      : unresolvedViolations > 0
        ? "Warning"
        : "Excellent";

  const highSeverity = violations.filter((v) => v.severity === "HIGH").length;
  const mediumSeverity = violations.filter((v) => v.severity === "MEDIUM").length;

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
          label="Total Violations"
          value={totalViolations}
        />

        <StatCard
          compact
          label="Unresolved"
          value={unresolvedViolations}
        />

        <StatCard
          compact
          label="High Severity"
          value={highSeverity}
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
