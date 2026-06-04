"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  progression: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

export default function SubjectDifficultyDistribution({
  progression,
}: Props) {
  const data = {
    labels: ["Easy", "Medium", "Hard", "Expert"],

    datasets: [
      {
        data: [
          progression.easy,
          progression.medium,
          progression.hard,
          progression.expert,
        ],

        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">
        Difficulty Distribution
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Student mastery progression levels.
      </p>

      <div className="mt-6 h-80">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
