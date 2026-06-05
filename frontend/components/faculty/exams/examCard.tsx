"use client";

import { memo } from "react";

import MotionCard from "@/components/motion/motionCard";

import { FacultyExam } from "@/types/exams/facultyExam";

interface Props {
  exam: FacultyExam;
}

function ExamCard({ exam }: Props) {
  return (
    <MotionCard>
      <div className="border-border bg-card rounded-2xl border p-5">
        <div>
          <h3 className="text-lg font-semibold">
            {exam.title}
          </h3>

          <p className="text-muted-foreground mt-1 text-sm">
            {exam.subjectName}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard
            label="Questions"
            value={exam.totalQuestions}
          />

          <MetricCard
            label="Attempts"
            value={exam.totalAttempts}
          />

          <MetricCard
            label="Average"
            value={`${exam.averageScore}%`}
          />

          <MetricCard
            label="Section"
            value={exam.sectionName}
          />
        </div>

        <div className="mt-4">
          <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
            {exam.status}
          </span>
        </div>
      </div>
    </MotionCard>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-3 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default memo(ExamCard);
