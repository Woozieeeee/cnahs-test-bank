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
    <div
      className="
        flex
        flex-1
        flex-col
        gap-4
        md:flex-row
      "
    >
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-sm
          text-foreground
          outline-none
          transition
          focus:border-ring
          focus:ring-2
          focus:ring-ring/20
        "
      />

      {/* FILTER */}

      <select
        value={assignmentFilter}
        onChange={(e) =>
          setAssignmentFilter(e.target.value)
        }
        className="
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-sm
          text-foreground
          outline-none
          transition
          focus:border-ring
          focus:ring-2
          focus:ring-ring/20
        "
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
