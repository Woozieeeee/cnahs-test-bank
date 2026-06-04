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
  progression: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
}

export default function SubjectAssessmentsProgressChart({
  progression,
}: Props) {
  const data = {
    labels: ["Easy", "Medium", "Hard", "Expert"],

    datasets: [
      {
        label: "Average Score",

        data: [
          progression.easy,
          progression.medium,
          progression.hard,
          progression.expert,
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
}
