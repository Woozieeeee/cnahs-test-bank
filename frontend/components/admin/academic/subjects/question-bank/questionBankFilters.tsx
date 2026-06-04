"use client";

import SearchInput from "@/components/common/search/searchInput";
import SearchFilter from "@/components/common/search/searchFilter";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  topic: string;
  setTopic: (value: string) => void;

  difficulty: string;
  setDifficulty: (value: string) => void;

  topics: string[];
}

export default function QuestionBankFilters({
  search,
  setSearch,
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  topics,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search topic..."
      />

      <SearchFilter
        value={topic}
        onChange={setTopic}
        placeholder="All Topics"
        options={topics.map((topic) => ({
          label: topic,
          value: topic,
        }))}
      />

      <SearchFilter
        value={difficulty}
        onChange={setDifficulty}
        placeholder="All Difficulties"
        options={[
          {
            label: "Easy",
            value: "EASY",
          },
          {
            label: "Medium",
            value: "MEDIUM",
          },
          {
            label: "Hard",
            value: "HARD",
          },
          {
            label: "Expert",
            value: "EXPERT",
          },
        ]}
      />
    </div>
  );
}
