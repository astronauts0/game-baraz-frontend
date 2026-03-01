import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";
import { CHART_COLORS } from "../useSellerTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface AnalyticsTabProps {
  portfolioStats: any;
  barChartData: any[];
  pieChartData: any[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  portfolioStats,
  barChartData,
  pieChartData,
}) => {
  const barData = {
    labels: barChartData.map((d) => d.name),
    datasets: [
      {
        label: "Cost",
        data: barChartData.map((d) => d.Investment),
        backgroundColor: "#cbd5e1",
        borderRadius: { topLeft: 4, topRight: 4 },
        stack: "Stack 0",
      },
      {
        label: "Profit",
        data: barChartData.map((d) => d.Profit),
        backgroundColor: "#8b5cf6",
        borderRadius: { topLeft: 4, topRight: 4 },
        stack: "Stack 0",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#f8fafc",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += "Rs " + context.parsed.y.toLocaleString();
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          color: "#64748b",
        },
      },
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutData = {
    labels: pieChartData.map((d) => d.name),
    datasets: [
      {
        data: pieChartData.map((d) => d.value),
        backgroundColor: CHART_COLORS,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#f8fafc",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += "Rs " + context.parsed.toLocaleString();
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {portfolioStats && portfolioStats.totalPlans > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase">
                Profitability Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[250px] relative">
              <Bar data={barData} options={barOptions} />
            </CardContent>
          </Card>
          <Card className="relative flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase">
                Capital Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[250px] relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-16">
                <div className="text-center">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">
                    Total Invested
                  </span>
                  <span className="text-lg font-serif font-bold text-slate-900">
                    Rs {(portfolioStats.totalInvestment / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20 min-h-[300px]">
          <BarChart3 size={48} className="mb-4 opacity-20" />
          <p>Save some scenarios to see analytics.</p>
        </div>
      )}
    </div>
  );
};
