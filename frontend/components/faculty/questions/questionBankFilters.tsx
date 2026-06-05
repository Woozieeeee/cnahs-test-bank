"use client";
import SearchAutocomplete from "@/components/common/search/searchAutocomplete";
import { memo } from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  difficulty: string;
  setDifficulty: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  questions: string[];
}

function QuestionBankFilters({
  search,
  setSearch,
  questions,
  difficulty,
  setDifficulty,
  status,
  setStatus,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-[3fr_1fr_1fr]">
        <SearchAutocomplete
          value={search}
          onChange={setSearch}
          suggestions={questions}
          placeholder="Search questions..."
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Difficulties</option>

          <option value="EASY">Easy</option>

          <option value="MEDIUM">Medium</option>

          <option value="HARD">Hard</option>

          <option value="EXPERT">Expert</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border-border bg-card rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Status</option>

          <option value="ACTIVE">Active</option>

          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
    </div>
  );
}
export default memo(QuestionBankFilters);
