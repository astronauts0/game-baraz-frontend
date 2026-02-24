import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { type InventoryItem } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
  chartData: InventoryItem[];
}

const PieChart: React.FC<PieChartData> = ({ chartData }) => {
  const data: ChartData<"doughnut"> = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        data: chartData.map((item) => item.value),
        backgroundColor: chartData.map((item) => item.color),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        bodyFont: {
          weight: "bold",
        },
        padding: 12,
        cornerRadius: 8,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        displayColors: true,
      },
    },
  };

  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      <Doughnut data={data} options={options} />

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-slate-900">142</span>
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          Total
        </span>
      </div>
    </div>
  );
};

export default PieChart;
