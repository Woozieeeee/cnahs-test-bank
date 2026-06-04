"use client";

import SearchInput from "@/components/common/search/searchInput";
import SearchFilter from "@/components/common/search/searchFilter";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function AssessmentFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search assessment..."
      />

      <SearchFilter
        value={status}
        onChange={setStatus}
        placeholder="All Statuses"
        options={[
          {
            label: "Draft",
            value: "DRAFT",
          },
          {
            label: "Scheduled",
            value: "SCHEDULED",
          },
          {
            label: "Ongoing",
            value: "ONGOING",
          },
          {
            label: "Completed",
            value: "COMPLETED",
          },
          {
            label: "Archived",
            value: "ARCHIVED",
          },
        ]}
      />
    </div>
  );
}
