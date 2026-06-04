interface Props {
  search: string;

  setSearch: (value: string) => void;

  assignmentFilter: string;

  setAssignmentFilter: (value: string) => void;
}

export default function SubjectsFilters({
  search,
  setSearch,
  assignmentFilter,
  setAssignmentFilter,
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row">
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 w-full rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
      />

      {/* FILTER */}

      <select
        value={assignmentFilter}
        onChange={(e) =>
          setAssignmentFilter(e.target.value)
        }
        className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2"
      >
        <option value="ALL">All Subjects</option>

        <option value="ASSIGNED">Assigned Faculty</option>

        <option value="UNASSIGNED">
          Unassigned Faculty
        </option>
      </select>
    </div>
  );
}
