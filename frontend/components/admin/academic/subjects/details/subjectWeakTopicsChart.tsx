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
  topics: {
    topic: string;
    score: number;
  }[];
}

export default function SubjectWeakTopicsChart({
  topics,
}: Props) {
  const data = {
    labels: topics.map((topic) => topic.topic),

    datasets: [
      {
        label: "Success Rate",

        data: topics.map((topic) => topic.score),

        backgroundColor: topics.map((topic) => {
          if (topic.score < 50) return "#ef4444"; // red

          if (topic.score < 70) return "#f59e0b"; // orange

          return "#22c55e"; // green
        }),

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

          indexAxis: "y",

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.raw}% Success Rate`,
              },
            },
          },

          scales: {
            x: {
              beginAtZero: true,

              max: 100,

              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        }}
      />
    </div>
  );
}
