"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

import { mockExamHistory } from "@/components/admin/academic/sections/data/mockStudentProfile";

function StudentExamHistory() {
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
            {mockExamHistory.map((exam) => (
              <tr
                key={exam.id}
                className="border-border/50 border-b"
              >
                <td className="py-4">{exam.exam}</td>

                <td className="py-4">{exam.subject}</td>

                <td className="py-4 font-semibold">
                  {exam.score}%
                </td>

                <td className="text-muted-foreground py-4">
                  {exam.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InfoCard>
  );
}

export default memo(StudentExamHistory);
