import { type SalesDataPoint } from "@/types";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface AreaChartProps {
  timeframe?: string;
  chartData?: SalesDataPoint[];
}

const AreaChart: React.FC<AreaChartProps> = ({
  timeframe = "month",
  chartData = [],
}) => {
  // Mock data for different timeframes
  const getChartData = () => {
    switch (timeframe) {
      case "day":
        return [
          { label: "00:00", value: 5000 },
          { label: "04:00", value: 8000 },
          { label: "08:00", value: 15000 },
          { label: "12:00", value: 35000 },
          { label: "16:00", value: 45000 },
          { label: "20:00", value: 25000 },
          { label: "23:59", value: 15000 },
        ];
      case "week":
        return [
          { label: "Mon", value: 120000 },
          { label: "Tue", value: 150000 },
          { label: "Wed", value: 180000 },
          { label: "Thu", value: 140000 },
          { label: "Fri", value: 250000 },
          { label: "Sat", value: 350000 },
          { label: "Sun", value: 300000 },
        ];
      case "month":
      default:
        return (chartData || []).map((d) => ({
          label: `DAY ${d.day}`,
          value: d.revenue,
        }));
    }
  };

  const currentData = getChartData();

  const data: ChartData<"line"> = {
    labels: currentData.map((d) => d.label),
    datasets: [
      {
        label: "Revenue",
        data: currentData.map((d) => d.value),
        borderColor: "#6366f1",
        borderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#6366f1",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `Revenue: Rs ${Number(context.parsed.y).toLocaleString()}`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;
