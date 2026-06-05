"use client";

import { memo, useMemo } from "react";

import type { Section } from "@/types/academic/section";

import StatCard from "@/components/common/cards/statCard";
import StatsGrid from "@/components/common/cards/statsGrid";

interface Props {
  sections: Section[];
}

function SectionsStats({ sections }: Props) {
  const stats = useMemo(() => {
    return {
      totalSections: sections.length,

      totalStudents: sections.reduce(
        (total, section) => total + section.users.length,
        0
      ),

      totalExams: sections.reduce(
        (total, section) => total + section.exams.length,
        0
      ),

      archivedSections: sections.filter(
        (section) => section.isArchived
      ).length,

      programs: new Set(
        sections.map((section) => section.program)
      ).size,
    };
  }, [sections]);

  const statItems = [
    {
      label: "Total Sections",
      value: stats.totalSections,
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
    },
    {
      label: "Total Exams",
      value: stats.totalExams,
    },
    {
      label: "Archived Sections",
      value: stats.archivedSections,
    },
    {
      label: "Programs",
      value: stats.programs,
    },
  ];

  return (
    <StatsGrid columns="md:grid-cols-2 xl:grid-cols-5">
      {statItems.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </StatsGrid>
  );
}

export default memo(SectionsStats);
