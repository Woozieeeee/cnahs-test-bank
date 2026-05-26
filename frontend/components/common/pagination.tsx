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
          border-slate-200
          px-3
          py-2
          text-sm
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

                ${
                  currentPage === page
                    ? `
                      bg-slate-900
                      text-white
                    `
                    : `
                      border
                      border-slate-200
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
          border-slate-200
          px-3
          py-2
          text-sm
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
}
