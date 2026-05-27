import SubjectsFilters from "../subjectsFilters";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  assignmentFilter: string;

  setAssignmentFilter: (value: string) => void;

  onCreate: () => void;
}

export default function SubjectsActions({
  search,

  setSearch,

  assignmentFilter,

  setAssignmentFilter,

  onCreate,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
      "
    >
      <div className="flex-1">
        <SubjectsFilters
          search={search}
          setSearch={setSearch}
          assignmentFilter={assignmentFilter}
          setAssignmentFilter={setAssignmentFilter}
        />
      </div>

      <button
        onClick={onCreate}
        className="
          rounded-xl
          bg-primary
          px-4
          py-3
          text-sm
          font-medium
          text-primary-foreground
          transition
          hover:bg-primary/90
        "
      >
        Create Subject
      </button>
    </div>
  );
}
