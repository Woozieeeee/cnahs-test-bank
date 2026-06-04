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

export default function QuestionWeakTopicsChart({
  topics,
}: Props) {
  const data = {
    labels: topics.map((topic) => topic.topic),

    datasets: [
      {
        label: "Success Rate",

        data: topics.map((topic) => topic.score),

        borderRadius: 8,

        backgroundColor: topics.map((topic) => {
          if (topic.score >= 80) {
            return "#22c55e";
          }

          if (topic.score >= 60) {
            return "#3b82f6";
          }

          if (topic.score >= 40) {
            return "#f59e0b";
          }

          return "#ef4444";
        }),
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
                  `${context.parsed.x}% Success Rate`,
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
