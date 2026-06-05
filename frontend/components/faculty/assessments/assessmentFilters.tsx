"use client";

import { memo } from "react";

import SearchAutocomplete from "@/components/common/search/searchAutocomplete";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  sectionId: string;

  setSectionId: (value: string) => void;

  sections: {
    id: number;
    name: string;
  }[];

  assessments: string[];
}

function AssessmentFilters({
  search,
  setSearch,
  sectionId,
  setSectionId,
  sections,
  assessments,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
        <SearchAutocomplete
          value={search}
          onChange={setSearch}
          suggestions={assessments}
          placeholder="Search assessments..."
        />

        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Sections</option>

          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(AssessmentFilters);
