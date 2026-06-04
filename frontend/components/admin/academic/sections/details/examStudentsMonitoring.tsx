import { memo } from "react";

import Link from "next/link";

import StatusBadge from "@/components/common/badges/statusBadge";

import { mockExamStudents } from "../data/mockExamStudents";

interface Props {
  sectionId: string;

  examId: string;
}

function ExamStudentsMonitoring({
  sectionId,
  examId,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Live Student Monitoring
        </h2>

        <Link
          href={`/admin/academic/sections/${sectionId}/exams/${examId}/students`}
          className="text-primary text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {mockExamStudents.map((student) => (
          <Link
            key={student.id}
            href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${student.id}`}
            className="border-border hover:border-ring block rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">
                  {student.name}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {student.studentId}
                </p>
              </div>

              <StatusBadge variant="success">
                {student.status}
              </StatusBadge>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
                  <span>Progress</span>

                  <span>{student.progress}%</span>
                </div>

                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full"
                    style={{
                      width: `${student.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Violations
                </span>

                <StatusBadge
                  variant={
                    student.violations > 0
                      ? "warning"
                      : "success"
                  }
                >
                  {student.violations}
                </StatusBadge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(ExamStudentsMonitoring);
