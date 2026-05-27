import { Subject, SectionSubject } from "@/types/subject";

import SubjectCardActions from "../subjectCardActions";

interface Props {
  subject: Subject;

  sectionSubjects: SectionSubject[];

  onEdit: () => void;

  onAssignFaculty: () => void;

  onAssignSections: () => void;

  onRefresh: () => void;
}

export default function SubjectCardHeader({
  subject,

  sectionSubjects,

  onEdit,

  onAssignFaculty,

  onAssignSections,

  onRefresh,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-foreground
          "
        >
          {subject.name}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <p
            className="
      text-sm
      text-muted-foreground
    "
          >
            {subject.code}
          </p>

          {subject.isArchived && (
            <span
              className="
        rounded-full
        border
        border-border
        bg-muted
        px-2
        py-0.5
        text-[10px]
        font-semibold
        uppercase
        tracking-wide
        text-muted-foreground
      "
            >
              Archived
            </span>
          )}
        </div>
      </div>

      <SubjectCardActions
        subjectId={subject.id}
        isArchived={subject.isArchived}
        hasFacultyAssigned={!!subject.faculty}
        hasSectionsAssigned={sectionSubjects.length > 0}
        onEdit={onEdit}
        onAssignFaculty={onAssignFaculty}
        onUnassignFaculty={() => {
          console.log("Unassign faculty");
        }}
        onAssignSections={onAssignSections}
        onUnassignSections={() => {
          console.log("Unassign sections");
        }}
        onRefresh={onRefresh}
      />
    </div>
  );
}
