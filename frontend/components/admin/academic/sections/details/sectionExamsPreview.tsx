import type { Section } from "@/types/section";

import Link from "next/link";

import ExamStatusBadge from "@/components/admin/exams/examStatusBadge";

interface Props {
  section: Section;
}

export default function SectionExamsPreview({
  section,
}: Props) {
  const exams = section.exams.slice(0, 5);

  return (
    <Link
      href={`/admin/academic/sections/${section.id}/exams`}
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
              Exams
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Recent and active exams for this section.
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
            {section.exams.length}
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
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-foreground
                      "
                    >
                      {exam.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-muted-foreground
                      "
                    >
                      {new Date(
                        exam.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <ExamStatusBadge status={exam.status} />
                </div>
              </div>
            ))
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
              No exams available yet.
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
          View All Exams →
        </div>
      </div>
    </Link>
  );
}
