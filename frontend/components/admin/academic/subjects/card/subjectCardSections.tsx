import { SectionSubject } from "@/types/subject";

interface Props {
  sectionSubjects: SectionSubject[];
}

export default function SubjectCardSections({
  sectionSubjects,
}: Props) {
  return (
    <div className="mt-6">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Assigned Sections
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {sectionSubjects.length > 0 ? (
          sectionSubjects.map((sectionSubject) => (
            <div
              key={sectionSubject.id}
              className="bg-muted text-foreground rounded-full px-3 py-1 text-xs font-medium"
            >
              {sectionSubject.section.name}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            No sections assigned
          </p>
        )}
      </div>
    </div>
  );
}
