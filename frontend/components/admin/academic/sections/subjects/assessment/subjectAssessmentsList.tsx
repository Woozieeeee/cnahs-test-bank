"use client";

import { memo } from "react";

import SubjectAssessmentCard from "./subjectAssessmentCard";

interface Assessment {
  id: number;

  title: string;

  difficulty: string;

  status: string;

  averageScore: number;

  passRate: number;

  violations: number;

  totalStudents: number;

  createdAt: string;
}

interface Props {
  sectionId: number;

  subjectId: number;

  assessments: Assessment[];
}

function SubjectAssessmentsList({
  sectionId,
  subjectId,
  assessments,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Assessments
        </h2>

        <p className="text-muted-foreground text-sm">
          View and manage subject assessments.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {assessments.map((assessment) => (
          <SubjectAssessmentCard
            key={assessment.id}
            sectionId={sectionId}
            subjectId={subjectId}
            assessment={assessment}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(SubjectAssessmentsList);
