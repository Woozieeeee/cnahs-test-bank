interface Props {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {/* PREVIOUS */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          rounded-lg
          border
          border-border
          bg-card
          px-3
          py-2
          text-sm
          text-foreground
          transition
          hover:bg-muted
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Previous
      </button>

      {/* PAGE NUMBERS */}

      {Array.from(
        { length: totalPages },

        (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                rounded-lg
                px-3
                py-2
                text-sm
                transition

                ${
                  currentPage === page
                    ? `
                      bg-primary
                      text-primary-foreground
                    `
                    : `
                      border
                      border-border
                      bg-card
                      text-foreground
                      hover:bg-muted
                    `
                }
              `}
            >
              {page}
            </button>
          );
        }
      )}

      {/* NEXT */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          rounded-lg
          border
          border-border
          bg-card
          px-3
          py-2
          text-sm
          text-foreground
          transition
          hover:bg-muted
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
}
