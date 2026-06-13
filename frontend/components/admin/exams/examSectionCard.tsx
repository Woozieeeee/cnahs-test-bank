"use client";

import { memo } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import MotionCard from "@/components/motion/motionCard";
import CardFooterLink from "@/components/common/cards/cardFooterLink";

interface Exam {
  id: number;
  title: string;
  code: string;
  subject: string;
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  totalQuestions: number;
  totalAttempts: number;
  totalViolations: number;
  unresolvedViolations: number;
}

interface ExamSectionData {
  id: number;
  name: string;
  code: string;
  program: string;
  yearLevel: number;
  totalStudents: number;
  activeStudents: number;
  exams: Exam[];
  violations: {
    total: number;
    unresolved: number;
    resolved: number;
    bySeverity: {
      LOW: number;
      MEDIUM: number;
      HIGH: number;
    };
  };
}

interface Props {
  section: ExamSectionData;
}

function ExamSectionCard({ section }: Props) {
  // Check if there are active exams
  const now = new Date();
  const activeExams = section.exams.filter((exam) => {
    const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
    const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
    if (!startsAt || !endsAt) return false;
    return startsAt <= now && now <= endsAt;
  });

  const hasUnresolvedViolations = section.violations.unresolved > 0;

  return (
    <MotionCard>
      <Link
        href={`/admin/exams/${section.id}`}
        className="bg-card block rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm border-border hover:border-ring"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-card-foreground text-lg font-semibold">
              {section.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {section.code} • {section.program} • Year {section.yearLevel}
            </p>
          </div>

          {/* Status Badge */}
          {activeExams.length > 0 && (
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-xs font-semibold">Active Exam</span>
            </div>
          )}

          {hasUnresolvedViolations && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
              <AlertCircle size={14} />
              <span className="text-xs font-semibold">
                {section.violations.unresolved} Violations
              </span>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-row-2 grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {section.totalStudents}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {section.activeStudents}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Exams</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {section.exams.length}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Violations</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {section.violations.total}
            </p>
          </div>
        </div>

        {/* ACTIVE EXAM INFO */}
        {activeExams.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">
              Active Exams ({activeExams.length})
            </p>
            <div className="mt-2 space-y-1">
              {activeExams.slice(0, 2).map((exam) => (
                <p key={exam.id} className="text-xs text-blue-800">
                  • {exam.subject} - {exam.title}
                </p>
              ))}
              {activeExams.length > 2 && (
                <p className="text-xs text-blue-800">
                  +{activeExams.length - 2} more
                </p>
              )}
            </div>
          </div>
        )}

        {section.exams.length === 0 && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-semibold text-gray-600">
              No exams scheduled yet
            </p>
          </div>
        )}

        {/* FOOTER */}
        <CardFooterLink label="View exam details" />
      </Link>
    </MotionCard>
  );
}

export default memo(ExamSectionCard);
