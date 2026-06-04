"use client";

import { memo } from "react";

import type { Subject } from "@/types/subject";

import SubjectDropdown from "./subjectDropdown";

import StatusBadge from "@/components/common/badges/statusBadge";

interface Props {
  subject: Subject;
}

function SubjectHeroCard({ subject }: Props) {
  const facultyName =
    subject.faculty?.name ?? "No Faculty Assigned";

  const hasFaculty = !!subject.faculty;

  // MOCKS FOR NOW

  const regularStudents = 42;

  const irregularStudents = 5;

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* HERO */}

      <div className="from-primary/15 via-primary/5 to-background relative bg-gradient-to-r p-8">
        <div className="absolute top-6 right-6">
          <SubjectDropdown
            items={[
              {
                label: "Export PDF",
                onClick: () => {},
              },
              {
                label: "Export Excel",
                onClick: () => {},
              },
            ]}
          />
        </div>

        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {subject.code}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {subject.name}
        </h1>

        <div className="mt-4">
          <StatusBadge
            variant={hasFaculty ? "success" : "warning"}
          >
            {hasFaculty ? "Assigned" : "Unassigned"}
          </StatusBadge>
        </div>
      </div>

      {/* DETAILS */}

      <div className="p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <InfoBlock label="Faculty" value={facultyName} />

          <InfoBlock
            label="Regular Students"
            value={regularStudents}
          />

          <InfoBlock
            label="Irregular Students"
            value={irregularStudents}
          />
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </p>

      <p className="text-foreground mt-2 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}

export default memo(SubjectHeroCard);
