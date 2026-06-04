"use client";

import Link from "next/link";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";
import EmptyState from "@/components/common/states/emptyState";

interface Props {
  subjects?: {
    id: number;

    code: string;

    name: string;

    sections: number;

    students: number;

    questions: number;

    assessments: number;
  }[];

  loading?: boolean;

  error?: string;

  onRetry?: () => void;
}

export default function FacultySubjectsPreview({
  subjects = [],
  loading = false,
  error = "",
  onRetry,
}: Props) {
  if (loading) {
    return (
      <LoadingState
        title="Loading subjects..."
        description="Please wait while we retrieve your assigned subjects."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load subjects."
        description={error}
        onRetry={onRetry}
      />
    );
  }

  if (subjects.length === 0) {
    return (
      <EmptyState
        title="No subjects assigned"
        description="You have not been assigned to any subjects yet."
      />
    );
  }

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Assigned Subjects
        </h2>

        <span className="text-muted-foreground text-sm">
          {subjects.length} Subject
          {subjects.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/faculty/subjects/${subject.id}`}
            className="border-border hover:bg-muted/50 block rounded-xl border p-4 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {subject.code}
                </p>

                <p className="text-muted-foreground text-sm">
                  {subject.name}
                </p>
              </div>

              <div className="text-right text-sm">
                <p>{subject.questions} Questions</p>

                <p className="text-muted-foreground">
                  {subject.assessments} Assessments
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
