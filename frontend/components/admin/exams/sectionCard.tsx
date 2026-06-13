"use client";

import MotionCard from "@/components/motion/motionCard";
import SectionStatusBadge from "./sectionStatusBadge";
import { ShieldAlert } from "lucide-react";

interface Section {
  id: number;
  name: string;
  code: string;
  program: string;
  yearLevel: number;
  totalStudents: number;
  activeStudents: number;
  exams: Array<{
    id: number;
    title: string;
    code: string;
    subject: string;
    status: string;
    difficulty: string;
    startsAt: string | null;
    endsAt: string | null;
    totalQuestions: number;
    totalAttempts: number;
    totalViolations: number;
    unresolvedViolations: number;
  }>;
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
  section: Section;
  onViewViolations?: (examId: number) => void;
}

export default function SectionCard({ section, onViewViolations }: Props) {
  const hasViolations = section.violations.total > 0;
  const unresolvedCount = section.violations.unresolved;
  const highSeverityCount = section.violations.bySeverity.HIGH;
  const ongoingExams = section.exams.filter(
    (e) => e.status === "ONGOING" || e.status === "IN_PROGRESS"
  );

  return (
    <MotionCard>
      <div className="border-border bg-card hover:border-border/70 w-full rounded-2xl border p-6 text-left transition hover:shadow-md">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground text-xl font-semibold">
              {section.name}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {section.code} • Year {section.yearLevel}
            </p>
          </div>

          <SectionStatusBadge
            active={ongoingExams.length > 0}
            hasViolations={hasViolations}
            hasSuspicious={highSeverityCount > 0}
          />
        </div>

        {/* STATS */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* VIOLATIONS */}
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Total Violations
            </p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {section.violations.total}
            </p>
            {unresolvedCount > 0 && (
              <p className="text-xs text-red-500 mt-1">
                {unresolvedCount} unresolved
              </p>
            )}
          </div>

          {/* HIGH SEVERITY */}
          <div className="bg-muted/40 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-500" />
              <p className="text-muted-foreground text-sm">
                High Severity
              </p>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-600">
              {highSeverityCount}
            </p>
          </div>

          {/* ACTIVE STUDENTS */}
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Active in Exam
            </p>
            <p className="text-foreground mt-2 text-2xl font-bold">
              {section.activeStudents}
            </p>
          </div>

          {/* TOTAL STUDENTS */}
          <div className="bg-muted/40 rounded-xl p-4">
            <p className="text-muted-foreground text-sm">
              Enrolled
            </p>
            <p className="text-foreground mt-2 text-2xl font-bold">
              {section.totalStudents}
            </p>
          </div>
        </div>

        {/* EXAMS SUMMARY */}
        {section.exams.length > 0 && (
          <div className="border-border bg-muted/40 mt-6 rounded-xl border p-4">
            <p className="text-foreground text-sm font-medium mb-3">
              {ongoingExams.length > 0
                ? `${ongoingExams.length} examination(s) active`
                : `${section.exams.length} exam(s) scheduled or completed`}
            </p>
            <div className="space-y-2">
              {section.exams.slice(0, 3).map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between text-xs bg-background/50 p-2 rounded"
                >
                  <div>
                    <p className="text-foreground font-medium">{exam.title}</p>
                    <p className="text-muted-foreground">{exam.subject}</p>
                  </div>
                  {exam.unresolvedViolations > 0 && (
                    <button
                      onClick={() => onViewViolations?.(exam.id)}
                      className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200 transition"
                    >
                      {exam.unresolvedViolations} violations
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MotionCard>
  );
}
