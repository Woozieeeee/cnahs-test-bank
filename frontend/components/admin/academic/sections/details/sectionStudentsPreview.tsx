import type { Section } from "@/types/section";

import Link from "next/link";

interface Props {
  section: Section;
}

export default function SectionSubjectsPreview({
  section,
}: Props) {
  return (
    <Link
      href={`/admin/academic/sections/${section.id}/subjects`}
      className="block h-full"
    >
      <div
        className="
          flex
          h-full
          flex-col
          rounded-2xl
          border
          border-border
          bg-card
          p-6
          transition
          hover:border-ring
          hover:shadow-sm
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-foreground
              "
            >
              Subjects
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Subjects currently assigned to this section.
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-muted
              px-3
              py-2
              text-sm
              font-medium
              text-foreground
            "
          >
            {section.sectionSubjects.length}
          </div>
        </div>

        {/* LIST */}

        <div
          className="
            mt-6
            flex-1
            space-y-3
          "
        >
          {section.sectionSubjects.length > 0 ? (
            section.sectionSubjects.map(
              (sectionSubject) => {
                const subject = sectionSubject.subject;

                return (
                  <div
                    key={sectionSubject.id}
                    className="
                      rounded-xl
                      border
                      border-border
                      bg-background
                      p-4
                    "
                  >
                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div>
                        <p
                          className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                          "
                        >
                          {subject.code}
                        </p>

                        <h3
                          className="
                            mt-1
                            text-sm
                            font-semibold
                            text-foreground
                          "
                        >
                          {subject.name}
                        </h3>
                      </div>

                      <div
                        className="
                          rounded-full
                          bg-blue-100
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          text-blue-700
                        "
                      >
                        Active
                      </div>
                    </div>

                    {/* FACULTY */}

                    <div
                      className="
                        mt-4
                        rounded-lg
                        bg-muted
                        px-3
                        py-2
                      "
                    >
                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-wide
                          text-muted-foreground
                        "
                      >
                        Assigned Faculty
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-foreground
                        "
                      >
                        {subject.faculty?.name ||
                          "No faculty assigned"}
                      </p>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div
              className="
                rounded-xl
                border
                border-dashed
                border-border
                p-8
                text-center
                text-sm
                text-muted-foreground
              "
            >
              No subjects assigned yet.
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-4
            text-sm
            font-medium
            text-primary
          "
        >
          View All Subjects →
        </div>
      </div>
    </Link>
  );
}
