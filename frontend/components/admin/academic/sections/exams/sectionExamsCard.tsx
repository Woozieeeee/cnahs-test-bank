import type { Exam } from "@/types/exam";

import ExamStatusBadge from "@/components/admin/exams/examStatusBadge";

import SectionExamMetrics from "./sectionExamMetrics";

interface Props {
  exam: Exam;
}

export default function SectionExamCard({ exam }: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        border-border
        p-5
        transition
        hover:border-ring
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-foreground
            "
          >
            {exam.title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            {exam.description}
          </p>
        </div>

        <ExamStatusBadge status={exam.status} />
      </div>

      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-2
        "
      >
        <span
          className="
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-medium
            text-blue-700
          "
        >
          {exam.difficulty}
        </span>

        <span
          className="
            rounded-full
            bg-muted
            px-3
            py-1
            text-xs
            font-medium
          "
        >
          {exam.duration} mins
        </span>
      </div>

      <SectionExamMetrics
        activeStudents={18}
        completionRate={72}
        violations={3}
      />
    </div>
  );
}
