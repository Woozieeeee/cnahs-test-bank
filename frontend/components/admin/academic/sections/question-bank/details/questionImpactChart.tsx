"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Props {
  blockedStudents: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

export default function QuestionImpactChart({
  blockedStudents,
}: Props) {
  const data = {
    labels: ["Easy", "Medium", "Hard", "Expert"],

    datasets: [
      {
        label: "Students Blocked",

        data: [
          blockedStudents.easy,
          blockedStudents.medium,
          blockedStudents.hard,
          blockedStudents.expert,
        ],

        backgroundColor: [
          "#22c55e", // Easy
          "#3b82f6", // Medium
          "#f59e0b", // Hard
          "#ef4444", // Expert
        ],

        borderColor: [
          "#16a34a",
          "#2563eb",
          "#d97706",
          "#dc2626",
        ],

        borderWidth: 1,

        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="h-80">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.parsed.y} Students Blocked`,
              },
            },
          },

          scales: {
            y: {
              beginAtZero: true,

              ticks: {
                precision: 0,
              },
            },
          },
        }}
      />
    </div>
  );
}
