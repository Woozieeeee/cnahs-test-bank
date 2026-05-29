import type { ExamStatus } from "@/types/exam";

interface Props {
  status: ExamStatus;
}

export default function ExamStatusBadge({ status }: Props) {
  const styles = {
    SCHEDULED: "bg-blue-100 text-blue-700",

    ONGOING: "bg-green-100 text-green-700",

    COMPLETED: "bg-slate-200 text-slate-700",

    ARCHIVED: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </div>
  );
}
