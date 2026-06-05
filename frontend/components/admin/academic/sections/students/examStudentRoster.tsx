import { memo } from "react";

import ExamStudentRosterItem from "./examStudentRosterItem";

import type { ExamStudent } from "@/types/assessments/examStudent";

interface Props {
  students: ExamStudent[];

  sectionId: string;

  examId: string;
}

function ExamStudentRoster({
  students,
  sectionId,
  examId,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold">
          Live Student Monitoring
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Monitor examination progress, violations, and
          session risks in real time.
        </p>
      </div>

      {/* ROSTER */}

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        {students.map((student) => (
          <ExamStudentRosterItem
            key={student.id}
            student={student}
            sectionId={sectionId}
            examId={examId}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ExamStudentRoster);
