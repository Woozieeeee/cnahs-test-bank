"use client";

import { memo } from "react";

interface Student {
  id: number;

  name: string;

  score: number;

  easy: boolean;

  medium: boolean;

  hard: boolean;

  expert: boolean;
}

interface Props {
  students: Student[];
}

function AssessmentDetailsStudents({ students }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Students</h2>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-2xl border">
        <table className="w-full">
          <thead>
            <tr className="border-border border-b">
              <th className="p-4 text-left">Student</th>

              <th className="p-4 text-left">Score</th>

              <th className="p-4 text-left">Progression</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-border border-b"
              >
                <td className="p-4">{student.name}</td>

                <td className="p-4">{student.score}%</td>

                <td className="p-4">
                  {[
                    student.easy && "Easy",
                    student.medium && "Medium",
                    student.hard && "Hard",
                    student.expert && "Expert",
                  ]
                    .filter(Boolean)
                    .join(" → ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(AssessmentDetailsStudents);
