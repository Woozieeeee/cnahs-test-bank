import { SectionSubject } from "@/types/subject";

interface Props {
  sectionSubjects: SectionSubject[];
}

export default function SubjectCardSections({
  sectionSubjects,
}: Props) {
  return (
    <div className="mt-6">
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        Assigned Sections
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {sectionSubjects.length > 0 ? (
          sectionSubjects.map((sectionSubject) => (
            <div
              key={sectionSubject.id}
              className="
                  rounded-full
                  bg-muted
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-foreground
                "
            >
              {sectionSubject.section.name}
            </div>
          ))
        ) : (
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            No sections assigned
          </p>
        )}
      </div>
    </div>
  );
}
