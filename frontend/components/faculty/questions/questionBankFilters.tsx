"use client";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  difficulty: string;

  setDifficulty: (value: string) => void;

  status: string;

  setStatus: (value: string) => void;
}

export default function QuestionBankFilters({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  status,
  setStatus,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="border-border rounded-xl border px-4 py-2"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border-border rounded-xl border px-4 py-2"
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
          className="border-border rounded-xl border px-4 py-2"
        >
          <option value="ALL">All Status</option>

          <option value="ACTIVE">Active</option>

          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
    </div>
  );
}
