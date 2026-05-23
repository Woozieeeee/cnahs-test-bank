interface Props {
  currentPage: number;

  totalPages: number;

  onPrevious: () => void;

  onNext: () => void;
}

export default function RegistrationPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div
      className="
        mt-6
        flex
        items-center
        justify-between
      "
    >
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
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

      <p className="text-sm">
        Page {currentPage} of {totalPages || 1}
      </p>

      <button
        disabled={currentPage === totalPages}
        onClick={onNext}
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
