"use client";

import MotionCard from "@/components/motion/motionCard";
import SubjectCardActions from "./subjectCardActions";

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
  subject: Subject;
  onAssignFaculty: () => void;
}

export default function SubjectCard({
  subject,
  onAssignFaculty,
}: Props) {
  return (
    <MotionCard>
      <div
        className="
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

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              {subject.code}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
      rounded-full
      bg-muted
      px-3
      py-1
      text-xs
      font-medium
      text-muted-foreground
    "
            >
              {subject.exams?.length || 0} Exams
            </div>

            <SubjectCardActions
              onEdit={() => {
                console.log("Edit subject");
              }}
              onAssignFaculty={onAssignFaculty}
              onAssignSections={() => {
                console.log("Assign sections");
              }}
              onArchive={() => {
                console.log("Archive subject");
              }}
            />
          </div>
        </div>

        {/* FACULTY */}

        <div
          className="
            mt-6
            rounded-xl
            bg-muted
            p-4
          "
        >
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-muted-foreground
            "
          >
            Assigned Faculty
          </p>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-foreground
            "
          >
            {subject.faculty?.name || "No faculty assigned"}
          </p>
        </div>

        {/* SECTIONS */}

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
            {subject.sections &&
            subject.sections.length > 0 ? (
              subject.sections.map((section) => (
                <div
                  key={section.id}
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
                  {section.name}
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

        {/* FOOTER */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-4
          "
        >
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Manage subject
          </p>

          <button
            className="
              rounded-lg
              bg-primary
              px-4
              py-2
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:bg-primary/90
            "
          >
            Open
          </button>
        </div>
      </div>
    </MotionCard>
  );
}
