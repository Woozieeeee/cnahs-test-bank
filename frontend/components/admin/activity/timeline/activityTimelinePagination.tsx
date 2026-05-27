import Pagination from "@/components/common/pagination";

interface Props {
  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export default function ActivityTimelinePagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="mt-8">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
