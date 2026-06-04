"use client";

import Link from "next/link";

import MotionCard from "@/components/motion/motionCard";

import { FacultyTopic } from "@/types/facultyTopic";

import FacultyTopicCardHeader from "./facultyTopicCardHeader";

interface Props {
  topic: FacultyTopic;

  subjectId: number;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;
}

export default function FacultyTopicCard({
  topic,
  subjectId,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  return (
    <MotionCard>
      <div
        className={`flex h-full flex-col rounded-2xl border p-6 transition-all ${
          topic.isArchived
            ? "border-muted border-dashed opacity-70"
            : "border-border hover:border-ring"
        }`}
      >
        <FacultyTopicCardHeader
          topic={topic}
          onEdit={onEdit}
          onArchive={onArchive}
          onRestore={onRestore}
        />

        <Link
          href={`/faculty/subjects/${subjectId}/topics/${topic.id}`}
          className="mt-4 flex flex-1 flex-col"
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            {topic.description ||
              "No description provided."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard
              label="Questions"
              value={topic.totalQuestions}
            />

            <MetricCard
              label="Status"
              value={
                topic.isArchived ? "Archived" : "Active"
              }
            />
          </div>

          <div className="text-primary mt-auto pt-5 text-sm font-medium">
            Open Question Bank →
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
  value: string | number;
}) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 text-center">
      <p className="text-muted-foreground text-xs">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
