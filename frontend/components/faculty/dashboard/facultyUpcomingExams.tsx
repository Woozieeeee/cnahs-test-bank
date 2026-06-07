"use client";

import { memo } from "react";

import Link from "next/link";

import EmptyState from "@/components/common/states/emptyState";

interface Props {
  exams: {
    id: number;

    title: string;

    subject: string;

    difficulty: string;

    scheduledAt: string;
  }[];
}

function FacultyUpcomingExams({ exams }: Props) {
  const displayExams = exams.slice(0, 5);

  if (!exams.length) {
    return (
      <EmptyState
        title="No upcoming exams"
        description="There are currently no scheduled assessments."
      />
    );
  }

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Upcoming Exams
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {exams.length} Exam
            {exams.length > 1 ? "s" : ""}
          </span>

          {exams.length > 5 && (
            <Link
              href="/faculty/exams"
              className="text-primary text-sm hover:underline"
            >
              View All
            </Link>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {displayExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
}

interface ExamCardProps {
  exam: {
    id: number;

    title: string;

    subject: string;

    difficulty: string;

    scheduledAt: string;
  };
}

function ExamCard({ exam }: ExamCardProps) {
  return (
    <div className="border-border hover:bg-muted/30 rounded-xl border p-4 transition-colors">
      <p className="font-medium">{exam.title}</p>

      <p className="text-muted-foreground mt-1 text-sm">
        {exam.subject}
      </p>

      <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs">
        <span>{exam.difficulty}</span>

        <span>
          {new Date(exam.scheduledAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default memo(FacultyUpcomingExams);
