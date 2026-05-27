import SubjectCard from "./subjectCard";

import type { Subject } from "@/types/subject";

interface Props {
  subjects: Subject[];

  onEdit: (subject: Subject) => void;

  onAssignFaculty: (subject: Subject) => void;

  onAssignSections: (subject: Subject) => void;

  onRefresh: () => void;
}

export default function SubjectsGrid({
  subjects,

  onEdit,

  onAssignFaculty,

  onAssignSections,

  onRefresh,
}: Props) {
  if (subjects.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-border
          bg-card
          p-10
          text-center
          text-muted-foreground
        "
      >
        No subjects created yet.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onEdit={() => onEdit(subject)}
          onAssignFaculty={() => onAssignFaculty(subject)}
          onAssignSections={() => onAssignSections(subject)}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
