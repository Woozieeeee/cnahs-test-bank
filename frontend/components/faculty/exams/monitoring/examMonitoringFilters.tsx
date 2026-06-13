"use client";

import { memo } from "react";

interface Props {
  filters: { search: string; riskLevel: string[]; hasViolations?: any };
  setFilters: (filters: any) => void;
  exams: any[];
}

function ExamMonitoringFiltersSimple({ filters, setFilters, exams }: Props) {
  const riskLevels = ["LOW", "MEDIUM", "HIGH"];
  const violationOptions = [
    { label: "All", value: undefined },
    { label: "With Violations", value: true },
    { label: "Without Violations", value: false },
  ];

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-[3fr_1fr_1fr]">
        <input
          type="text"
          placeholder="Search exams..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border-border bg-card rounded-xl border px-4 py-2"
        />

        <select
          value={filters.riskLevel.join(",")}
          onChange={(e) =>
            setFilters({
              ...filters,
              riskLevel: e.target.value ? e.target.value.split(",") : [],
            })
          }
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="">All Risk Levels</option>
          {riskLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          value={filters.hasViolations === undefined ? "" : filters.hasViolations}
          onChange={(e) =>
            setFilters({
              ...filters,
              hasViolations:
                e.target.value === ""
                  ? undefined
                  : e.target.value === "true",
            })
          }
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          {violationOptions.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(ExamMonitoringFiltersSimple);
