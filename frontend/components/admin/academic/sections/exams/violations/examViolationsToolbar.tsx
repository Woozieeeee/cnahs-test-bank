"use client";

import { memo } from "react";

import ExamViolationsTabs from "./examViolationsTabs";

import ExamViolationsSearch from "./examViolationsSearch";

interface Props {
  activeTab: string;

  onTabChange: (tab: string) => void;

  search: string;

  onSearchChange: (value: string) => void;
}

function ExamViolationsToolbar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <ExamViolationsTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="w-full lg:max-w-md">
        <ExamViolationsSearch
          value={search}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

export default memo(ExamViolationsToolbar);
