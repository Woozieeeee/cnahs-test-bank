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
  correct: number;

  incorrect: number;
}

export default function QuestionCorrectnessChart({
  correct,
  incorrect,
}: Props) {
  const data = {
    labels: ["Correct", "Incorrect"],

    datasets: [
      {
        data: [correct, incorrect],

        backgroundColor: [
          "#22c55e", // Correct
          "#ef4444", // Incorrect
        ],

        borderColor: ["#16a34a", "#dc2626"],

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

            tooltip: {
              callbacks: {
                label: (context) => {
                  const total = correct + incorrect;

                  const value = context.parsed;

                  const percentage = Math.round(
                    (value / total) * 100
                  );

                  return `${value} Students (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
