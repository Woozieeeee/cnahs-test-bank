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
  const hasFacultyAssigned =
    (subject.faculties?.length ?? 0) > 0;
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-foreground text-xl font-semibold">
          {subject.name}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            {subject.code}
          </p>

          {subject.isArchived && (
            <span className="border-border bg-muted text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
              Archived
            </span>
          )}
        </div>
      </div>

      <SubjectCardActions
        subjectId={subject.id}
        isArchived={subject.isArchived}
        onEdit={onEdit}
        onManageFaculty={onAssignFaculty}
        onManageSections={onAssignSections}
        onRefresh={onRefresh}
      />
    </div>
  );
}
