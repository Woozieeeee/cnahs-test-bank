"use client";

import { memo, useCallback } from "react";

import SubjectsFilters from "../subjectsFilters";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  assignmentFilter: string;

  setAssignmentFilter: (value: string) => void;

  onCreate: () => void;
}

function SubjectsActions({
  search,
  setSearch,
  assignmentFilter,
  setAssignmentFilter,
  onCreate,
}: Props) {
  const handleCreate = useCallback(() => {
    onCreate();
  }, [onCreate]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <SubjectsFilters
          search={search}
          setSearch={setSearch}
          assignmentFilter={assignmentFilter}
          setAssignmentFilter={setAssignmentFilter}
        />
      </div>

      <button
        onClick={handleCreate}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
      >
        Create Subject
      </button>
    </div>
  );
}

export default memo(SubjectsActions);
