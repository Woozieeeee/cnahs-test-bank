"use client";

import { memo } from "react";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  topic: string;

  setTopic: (value: string) => void;

  sort: string;

  setSort: (value: string) => void;

  topics: string[];
}

function QuestionBankFilters({
  search,
  setSearch,
  topic,
  setTopic,
  sort,
  setSort,
  topics,
}: Props) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      {/* SEARCH */}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search question..."
        className="border-border bg-background flex-1 rounded-xl border px-4 py-2"
      />

      {/* TOPIC */}

      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border-border bg-background rounded-xl border px-4 py-2"
      >
        <option value="ALL">All Topics</option>

        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {/* SORT */}

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border-border bg-background rounded-xl border px-4 py-2"
      >
        <option value="FAILED">Most Failed</option>

        <option value="PASSED">Most Passed</option>

        <option value="ATTEMPTS">Most Attempted</option>
      </select>
    </div>
  );
}

export default memo(QuestionBankFilters);
