"use client";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  status: string;

  setStatus: (value: string) => void;
}

export default function FacultyTopicFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search topics..."
        className="border-border rounded-xl border px-4 py-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border-border bg-card rounded-xl border px-4 py-2"
      >
        <option value="ALL">All Topics</option>

        <option value="ACTIVE">Active</option>

        <option value="ARCHIVED">Archived</option>
      </select>
    </div>
  );
}
