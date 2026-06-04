"use client";

import MotionCard from "@/components/motion/motionCard";
import { Subject } from "@/types/subject";
import Link from "next/link";
import SubjectCardHeader from "./card/subjectCardHeader";

interface Props {
  subject: Subject;

  onEdit: () => void;

  onAssignFaculty: () => void;

  onAssignSections: () => void;

  onRefresh: () => void;
}

export default function SubjectCard({
  subject,
  onEdit,
  onAssignFaculty,
  onAssignSections,
  onRefresh,
}: Props) {
  const sectionCount = subject.sectionSubjects?.length ?? 0;

  const facultyCount = subject.faculties?.length ?? 0;

  const facultyNames =
    subject.faculties
      ?.slice(0, 2)
      .map((assignment) => assignment.faculty.name) ?? [];

  // MOCKS FOR NOW

  return (
    <MotionCard>
      <div
        className={`flex h-full flex-col rounded-2xl border p-6 transition-all ${
          subject.isArchived
            ? "border-muted border-dashed opacity-70"
            : "border-border hover:border-ring"
        }`}
      >
        <SubjectCardHeader
          subject={subject}
          sectionSubjects={subject.sectionSubjects || []}
          onEdit={onEdit}
          onAssignFaculty={onAssignFaculty}
          onAssignSections={onAssignSections}
          onRefresh={onRefresh}
        />

        <Link
          href={`/admin/academic/subjects/${subject.id}`}
          className="mt-4 flex flex-1 flex-col"
        >
          {/* DESCRIPTION */}

          <p className="text-muted-foreground text-sm leading-relaxed">
            {subject.description ||
              "No description provided."}
          </p>

          {/* FACULTY */}

          <div className="bg-muted/40 mt-5 rounded-xl p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Faculty Pool
            </p>

            {facultyCount === 0 ? (
              <p className="text-foreground mt-2 text-sm font-medium">
                No faculty assigned
              </p>
            ) : (
              <div className="mt-2">
                <p className="text-foreground text-sm font-medium">
                  {facultyNames.join(", ")}
                </p>

                {facultyCount > 2 && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    +{facultyCount - 2} more faculty
                  </p>
                )}

                <p className="text-muted-foreground mt-1 text-xs">
                  {facultyCount} faculty member
                  {facultyCount > 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>

          {/* METRICS */}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard
              label="Sections"
              value={sectionCount}
            />

            <MetricCard
              label="Students"
              value={subject.totalStudents ?? 0}
            />

            <MetricCard
              label="Questions"
              value={subject.totalQuestions ?? 0}
            />

            <MetricCard
              label="Exams"
              value={subject.totalExams ?? 0}
            />
          </div>

          {/* FOOTER */}

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Subject Dashboard →
          </div>
        </Link>
      </div>
    </MotionCard>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="text-foreground mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}
