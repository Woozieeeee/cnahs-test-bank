"use client";

import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";

interface Props {
  profile: {
    recentExams: Array<{
      id: number;
      examId: number;
      examTitle: string;
      subjectName: string;
      score: number;
      status: string;
    }>;
  };
}

function StudentTopicStrengths({ profile }: Props) {
  // Calculate topics by average score (highest performers)
  const topicScores: { [key: string]: { total: number; count: number } } = {};

  profile.recentExams.forEach((exam) => {
    if (!topicScores[exam.subjectName]) {
      topicScores[exam.subjectName] = { total: 0, count: 0 };
    }
    topicScores[exam.subjectName].total += exam.score;
    topicScores[exam.subjectName].count += 1;
  });

  const sorted = Object.entries(topicScores)
    .map(([topic, data]) => ({
      topic,
      score: Math.round(data.total / data.count),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <InfoCard>
      <h2 className="text-lg font-semibold">
        Strongest Topics
      </h2>

      <div className="mt-5 space-y-4">
        {sorted.length > 0 ? (
          sorted.map((topic) => (
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
          ))
        ) : (
          <p className="text-muted-foreground">No exam data yet</p>
        )}
      </div>
    </InfoCard>
  );
}

export default memo(StudentTopicStrengths);
