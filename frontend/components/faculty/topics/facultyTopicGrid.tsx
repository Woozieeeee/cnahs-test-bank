"use client";

import EmptyState from "@/components/common/states/emptyState";

import { FacultyTopic } from "@/types/faculty/facultyTopic";

import FacultyTopicCard from "./card/facultyTopicCard";

interface Props {
  subjectId: number;

  topics: FacultyTopic[];

  onEdit: (topic: FacultyTopic) => void;

  onArchive: (topicId: number) => void;

  onRestore: (topicId: number) => void;
}

export default function FacultyTopicGrid({
  subjectId,
  topics,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  if (topics.length === 0) {
    return (
      <EmptyState
        title="No topics found"
        description="Create your first topic to begin organizing questions."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {topics.map((topic) => (
        <FacultyTopicCard
          key={topic.id}
          topic={topic}
          subjectId={subjectId}
          onEdit={() => onEdit(topic)}
          onArchive={() => onArchive(topic.id)}
          onRestore={() => onRestore(topic.id)}
        />
      ))}
    </div>
  );
}
