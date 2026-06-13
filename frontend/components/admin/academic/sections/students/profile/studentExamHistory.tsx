"use client";

import { memo, useState } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import Pagination from "@/components/common/pagination";

interface Props {
  profile: {
    recentExams: Array<{
      id: number;
      examId: number;
      examTitle: string;
      subjectName: string;
      subjectSlug: string;
      score: number;
      status: string;
      submittedAt: string;
      startedAt: string;
    }>;
  };
}

function StudentExamHistory({ profile }: Props) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedExams = profile.recentExams.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const totalPages = Math.ceil(profile.recentExams.length / PAGE_SIZE);

  return (
    <InfoCard>
      <div>
        <h2 className="text-lg font-semibold">
          Exam History
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Recent examination performance.
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-border border-b">
              <th className="py-3 text-left text-sm">
                Exam
              </th>

              <th className="py-3 text-left text-sm">
                Subject
              </th>

              <th className="py-3 text-left text-sm">
                Score
              </th>

              <th className="py-3 text-left text-sm">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedExams.map((exam) => (
              <tr
                key={exam.id}
                className="border-border/50 border-b"
              >
                <td className="py-4">{exam.examTitle}</td>

                <td className="py-4">{exam.subjectName}</td>

                <td className="py-4 font-semibold">
                  {exam.score.toFixed(1)}%
                </td>

                <td className="text-muted-foreground py-4">
                  {new Date(exam.submittedAt || exam.startedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {profile.recentExams.length === 0 && (
        <div className="mt-5 text-center text-muted-foreground">
          No exam history yet
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </InfoCard>
  );
}

export default memo(StudentExamHistory);
