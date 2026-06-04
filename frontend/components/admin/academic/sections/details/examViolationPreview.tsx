"use client";

import { memo } from "react";

import Link from "next/link";

import StatusBadge from "@/components/common/badges/statusBadge";

import PreviewCard from "@/components/common/cards/previewCard";

import { mockExamViolationLogs } from "../data/mockExamViolationsLog";

interface Props {
  sectionId: string;

  examId: string;
}

function ExamViolationsPreview({
  sectionId,
  examId,
}: Props) {
  const recentViolations = mockExamViolationLogs.slice(
    0,
    5
  );

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Violations
        </h2>

        <Link
          href={`/admin/academic/sections/${sectionId}/exams/${examId}/violations`}
          className="text-primary text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      {/* VIOLATIONS */}

      <div className="mt-5 space-y-3">
        <div className="mt-5 space-y-4">
          {recentViolations.map((violation, index) => (
            <Link
              key={violation.id}
              href={`/admin/academic/sections/${sectionId}/exams/${examId}/students/${violation.studentId}`}
              className="block"
            >
              <div className="flex gap-4">
                {/* TIME */}

                <div className="text-muted-foreground w-16 pt-1 text-right text-xs">
                  {violation.timeAgo}
                </div>

                {/* DOT */}

                <div className="relative">
                  {index !==
                    recentViolations.length - 1 && (
                    <div className="bg-border absolute top-5 left-1/2 h-full w-px -translate-x-1/2 dark:bg-slate-700" />
                  )}

                  <div className="relative z-10 mt-1 h-3 w-3 rounded-full bg-red-500" />
                </div>

                {/* CONTENT */}

                <div className="flex-1 rounded-xl border border-red-200 bg-red-50/30 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 dark:border-red-900/60 dark:bg-red-950/20 dark:hover:border-red-800 dark:hover:bg-red-950/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-red-700 dark:text-red-400">
                        {violation.type}
                      </p>

                      <p className="text-muted-foreground text-sm">
                        {violation.student} •{" "}
                        {violation.studentId}
                      </p>
                    </div>

                    <StatusBadge variant="danger">
                      {violation.severity}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ExamViolationsPreview);
