import Link from "next/link";

interface Props {
  student: any;

  sectionId: string;

  examId: string;
}

export default function ExamStudentCard({
  student,
  sectionId,
  examId,
}: Props) {
  return (
    <Link
      href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${student.studentId}`}
      className="
        block
        rounded-2xl
        border
        border-border
        bg-card
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
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            {student.name}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            {student.studentId}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-medium
            text-green-700
          "
        >
          {student.status}
        </span>
      </div>

      <div className="mt-4">
        <div
          className="
            flex
            justify-between
            text-sm
          "
        >
          <span>Progress</span>

          <span>{student.progress}%</span>
        </div>

        <div
          className="
            mt-2
            h-2
            rounded-full
            bg-muted
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-primary
            "
            style={{
              width: `${student.progress}%`,
            }}
          />
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          gap-2
        "
      >
        <span
          className="
            rounded-full
            bg-orange-100
            px-3
            py-1
            text-xs
            text-orange-700
          "
        >
          {student.warnings} Warnings
        </span>

        <span
          className="
            rounded-full
            bg-red-100
            px-3
            py-1
            text-xs
            text-red-700
          "
        >
          {student.risk} Risk
        </span>
      </div>
    </Link>
  );
}
