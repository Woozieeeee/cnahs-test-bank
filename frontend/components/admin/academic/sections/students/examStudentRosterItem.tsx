import Link from "next/link";
import { memo } from "react";
import type { ExamStudent } from "@/types/assessments/examStudent";

interface Props {
  student: ExamStudent;

  sectionId: string;

  examId: string;
}

function ExamStudentRosterItem({
  student,
  sectionId,
  examId,
}: Props) {
  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const riskStyles =
    student.riskLevel === "HIGH"
      ? `
        bg-red-100
        text-red-700
      `
      : student.riskLevel === "MEDIUM"
        ? `
          bg-amber-100
          text-amber-700
        `
        : `
          bg-green-100
          text-green-700
        `;

  const statusStyles =
    student.status === "FLAGGED"
      ? `
        bg-amber-100
        text-amber-700
      `
      : student.status === "TERMINATED"
        ? `
          bg-red-100
          text-red-700
        `
        : `
          bg-green-100
          text-green-700
        `;

  return (
    <Link
      href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${student.id}`}
      className="border-border bg-background hover:border-primary/30 hover:bg-muted/20 block rounded-2xl border p-5 transition-all"
    >
      <div className="grid gap-6 xl:items-center">
        {/* STUDENT */}

        <div className="flex items-center gap-4">
          {/* AVATAR */}

          <div className="bg-primary text-primary-foreground flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
            {initials}
          </div>

          {/* INFO */}

          <div className="min-w-0">
            <h3 className="text-foreground truncate text-lg font-semibold">
              {student.name}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              Student ID: {student.studentId}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles} `}
              >
                {student.status}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskStyles} `}
              >
                {student.riskLevel} RISK
              </span>
            </div>
          </div>
        </div>

        {/* PROGRESSION */}

        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Progression
          </p>

          <div className="mt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {student.currentDifficulty}
              </span>

              <span className="font-semibold">
                {student.progress}%
              </span>
            </div>

            {/* BAR */}

            <div className="bg-muted mt-2 h-2.5 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full"
                style={{
                  width: `${student.progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* VIOLATIONS */}

        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Integrity Summary
          </p>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">
                {student.violations}
              </div>

              <div>
                <p className="text-foreground text-sm font-medium">
                  Violations Detected
                </p>

                <p className="text-muted-foreground text-xs">
                  Integrity monitoring alerts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}

        <div className="flex justify-end">
          <div className="border-border bg-card text-foreground hover:bg-muted rounded-xl border px-4 py-2.5 text-sm font-medium transition-all">
            Open Session →
          </div>
        </div>
      </div>
    </Link>
  );
}
export default memo(ExamStudentRosterItem);
