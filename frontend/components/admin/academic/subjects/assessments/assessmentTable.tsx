"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import SearchEmptyState from "@/components/common/search/searchEmptyState";
import { Assessment } from "@/types/assessments/assessment";

interface Props {
  assessments: Assessment[];

  subjectId: number;
}

function AssessmentTable({
  assessments,
  subjectId,
}: Props) {
  const router = useRouter();

  if (!assessments.length) {
    return (
      <SearchEmptyState
        title="No assessments found"
        description="Try adjusting your filters."
      />
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b">
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Assessment</th>

              <th className="p-4 text-left">Difficulty</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Sections</th>

              <th className="p-4 text-left">Students</th>

              <th className="p-4 text-left">
                Average Score
              </th>
            </tr>
          </thead>

          <tbody>
            {assessments.map((assessment) => (
              <tr
                key={assessment.id}
                onClick={() =>
                  router.push(
                    `/admin/academic/subjects/${subjectId}/assessments/${assessment.id}`
                  )
                }
                className="border-border hover:bg-muted/50 cursor-pointer border-b transition-colors"
              >
                <td className="p-4"># {assessment.id}</td>

                <td className="p-4">{assessment.title}</td>

                <td>{assessment.difficulty}</td>

                <td>{assessment.status}</td>

                <td className="p-4">
                  {assessment.section.name}
                </td>

                <td className="p-4">
                  {assessment._count.examQuestions}
                </td>

                <td className="p-4">
                  {assessment._count.attempts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(AssessmentTable);
