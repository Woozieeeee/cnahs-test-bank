"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  trend: {
    label: string;
    score: number;
  }[];
}

export default function SubjectAssessmentsTrendChart({
  trend,
}: Props) {
  const data = {
    labels: trend.map((item) => item.label),

    datasets: [
      {
        label: "Average Score",

        data: trend.map((item) => item.score),
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,
  };

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
}
