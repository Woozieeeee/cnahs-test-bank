"use client";

import { memo } from "react";

import SearchAutocomplete from "@/components/common/search/searchAutocomplete";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  section: string;

  setSection: (value: string) => void;

  sections: string[];

  suggestions: string[];
}

function ExamFilters({
  search,
  setSearch,
  section,
  setSection,
  sections,
  suggestions,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
        <SearchAutocomplete
          value={search}
          onChange={setSearch}
          suggestions={suggestions}
          placeholder="Search exams..."
        />

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Sections</option>

          {sections.map((sectionName) => (
            <option key={sectionName} value={sectionName}>
              {sectionName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(ExamFilters);
