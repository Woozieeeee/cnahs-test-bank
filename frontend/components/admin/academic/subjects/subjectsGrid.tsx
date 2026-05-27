import SubjectCard from "./subjectCard";

interface Subject {
  id: number;

  name: string;

  code: string;

  faculty?: {
    name: string;
  } | null;

  sections?: {
    id: number;

    name: string;
  }[];

  exams?: {
    id: number;
  }[];
}

interface Props {
  subjects: Subject[];
  onAssignFaculty: (subject: Subject) => void;
}

export default function SubjectsGrid({
  subjects,
  onAssignFaculty,
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
          onAssignFaculty={() => onAssignFaculty(subject)}
        />
      ))}
    </div>
  );
}
