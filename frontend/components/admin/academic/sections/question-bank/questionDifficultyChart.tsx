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
  distribution: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

export default function QuestionDifficultyChart({
  distribution,
}: Props) {
  const data = {
    labels: ["Easy", "Medium", "Hard", "Expert"],

    datasets: [
      {
        data: [
          distribution.easy,
          distribution.medium,
          distribution.hard,
          distribution.expert,
        ],

        backgroundColor: [
          "#4ade80", // Easy
          "#60a5fa", // Medium
          "#fbbf24", // Hard
          "#f87171", // Expert
        ],

        borderColor: [
          "#16a34a",
          "#2563eb",
          "#d97706",
          "#dc2626",
        ],

        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-80">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              position: "bottom",

              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },
          },
        }}
      />
    </div>
  );
}
