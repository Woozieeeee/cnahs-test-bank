interface Props {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export default function UsersPagination({
  currentPage,

  totalPages,

  onPageChange,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-3
      "
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          rounded-lg
          border
          px-4
          py-2
          disabled:opacity-50
        "
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          rounded-lg
          border
          px-4
          py-2
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
}
