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
  distribution: {
    excellent: number;
    good: number;
    average: number;
    belowAverage: number;
    failed: number;
  };
}

export default function AssessmentDetailsDistributionChart({
  distribution,
}: Props) {
  const data = {
    labels: [
      "Excellent",
      "Good",
      "Average",
      "Below Avg",
      "Failed",
    ],

    datasets: [
      {
        label: "Students",

        data: [
          distribution.excellent,
          distribution.good,
          distribution.average,
          distribution.belowAverage,
          distribution.failed,
        ],
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
        }}
      />
    </div>
  );
}
