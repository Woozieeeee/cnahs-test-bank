"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

import { mockStrongestTopics } from "@/components/admin/academic/sections/data/mockStudentProfile";

function StudentTopicStrengths() {
  return (
    <InfoCard>
      <h2 className="text-lg font-semibold">
        Strongest Topics
      </h2>

      <div className="mt-5 space-y-4">
        {mockStrongestTopics.map((topic) => (
          <div
            key={topic.topic}
            className="bg-muted/40 flex items-center justify-between rounded-xl p-4"
          >
            <span className="font-medium">
              {topic.topic}
            </span>

            <span className="rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {topic.score}%
            </span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

export default memo(StudentTopicStrengths);
