"use client";

import MotionCard from "@/components/motion/motionCard";

import { Subject } from "@/types/subject";

import SubjectCardHeader from "./card/subjectCardHeader";

import SubjectCardFaculty from "./card/subjectCardFaculty";

import SubjectCardSections from "./card/subjectCardSections";

interface Props {
  subject: Subject;

  onEdit: () => void;

  onAssignFaculty: () => void;

  onAssignSections: () => void;

  onRefresh: () => void;
}

export default function SubjectCard({
  subject,

  onEdit,

  onAssignFaculty,

  onAssignSections,

  onRefresh,
}: Props) {
  const sectionSubjects = subject.sectionSubjects || [];

  return (
    <MotionCard>
      <div
        className={`
         rounded-2xl
         border
         bg-card
         p-6
         transition
         hover:shadow-sm

         ${
           subject.isArchived
             ? `
                border-dashed
                border-muted
                opacity-70
              `
             : `
                border-border
                hover:border-ring
              `
         }
        `}
      >
        <SubjectCardHeader
          subject={subject}
          sectionSubjects={sectionSubjects}
          onEdit={onEdit}
          onAssignFaculty={onAssignFaculty}
          onAssignSections={onAssignSections}
          onRefresh={onRefresh}
        />

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            text-sm
            leading-relaxed
            text-muted-foreground
          "
        >
          {subject.description ||
            "No description provided."}
        </p>

        <SubjectCardFaculty
          facultyName={subject.faculty?.name}
        />

        <SubjectCardSections
          sectionSubjects={sectionSubjects}
        />
      </div>
    </MotionCard>
  );
}
