import UsersPagination from "@/components/admin/users/usersPagination";

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
      <UsersPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
