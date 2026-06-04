"use client";

import { memo } from "react";

interface Usage {
  assessment: string;

  difficulty: string;

  result: number;
}

interface Props {
  usage: Usage[];
}

function QuestionAssessmentUsage({ usage }: Props) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="p-6">
        <h2 className="text-lg font-semibold">
          Assessment Usage
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-border border-b">
            <th className="p-4 text-left">Assessment</th>

            <th className="p-4 text-left">Difficulty</th>

            <th className="p-4 text-left">Success Rate</th>
          </tr>
        </thead>

        <tbody>
          {usage.map((item) => (
            <tr
              key={item.assessment}
              className="border-border border-b"
            >
              <td className="p-4">{item.assessment}</td>

              <td className="p-4">{item.difficulty}</td>

              <td className="p-4">{item.result}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(QuestionAssessmentUsage);
