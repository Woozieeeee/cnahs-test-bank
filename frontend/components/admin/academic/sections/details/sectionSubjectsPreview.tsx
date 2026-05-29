import type { Section } from "@/types/section";

import Link from "next/link";

interface Props {
  section: Section;
}

export default function SectionStudentsPreview({
  section,
}: Props) {
  return (
    <Link
      href={`/admin/academic/sections/${section.id}/students`}
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
              Students
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Students currently assigned to this section.
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
            {section.users.length}
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
          {section.users.length > 0 ? (
            section.users.map((student) => {
              const initials =
                student.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "ST";

              return (
                <div
                  key={student.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* AVATAR */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-muted
                        text-sm
                        font-semibold
                        text-foreground
                      "
                    >
                      {initials}
                    </div>

                    {/* INFO */}

                    <div>
                      <p
                        className="
                          text-sm
                          font-medium
                          text-foreground
                        "
                      >
                        {student.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {student.studentId}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div
                    className="
                      rounded-full
                      bg-green-100
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-green-700
                    "
                  >
                    Active
                  </div>
                </div>
              );
            })
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
              No students assigned yet.
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
          View All Students →
        </div>
      </div>
    </Link>
  );
}
