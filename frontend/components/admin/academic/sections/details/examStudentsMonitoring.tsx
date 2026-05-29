import Link from "next/link";

import { mockExamStudents } from "../data/mockExamStudents";

interface Props {
  sectionId: string;

  examId: string;
}

export default function ExamStudentsMonitoring({
  sectionId,
  examId,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Live Student Monitoring
        </h2>

        <Link
          href={`/admin/academic/sections/${sectionId}/exams/${examId}/students`}
          className="
            text-sm
            font-medium
            text-primary
          "
        >
          View All →
        </Link>
      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {mockExamStudents.map((student) => (
          <Link
            key={student.id}
            href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${student.id}`}
            className="
              block
              rounded-xl
              border
              border-border
              p-4
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
                <h3
                  className="
                    font-medium
                  "
                >
                  {student.name}
                </h3>

                <p
                  className="
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

            <div
              className="
                mt-3
                flex
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
                  text-blue-700
                "
              >
                {student.progress}%
              </span>

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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
