"use client";

import { memo } from "react";

import SearchAutocomplete from "@/components/common/search/searchAutocomplete";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  topic: string;

  setTopic: (value: string) => void;

  topics: string[];

  suggestions: string[];
}

function QuestionBuilderFilters({
  search,
  setSearch,
  topic,
  setTopic,
  topics,
  suggestions,
}: Props) {
  console.log("Topics:", topics);
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
        <SearchAutocomplete
          value={search}
          onChange={setSearch}
          suggestions={suggestions}
          placeholder="Search questions..."
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Topics</option>

          {topics.map((topicName) => (
            <option key={topicName} value={topicName}>
              {topicName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(QuestionBuilderFilters);
