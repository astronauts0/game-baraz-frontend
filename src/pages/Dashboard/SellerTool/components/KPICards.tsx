import React from "react";
import { DollarSign, TrendingUp, Percent, BarChart } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

interface KPICardsProps {
  netProfit: number;
  roi: number;
  profitMargin: number;
  breakEven: number;
}

export const KPICards: React.FC<KPICardsProps> = ({
  netProfit,
  roi,
  profitMargin,
  breakEven,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        label="Proj. Net Profit"
        value={
          <span
            className={netProfit >= 0 ? "text-emerald-600" : "text-red-600"}
          >
            Rs{" "}
            {netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        }
        icon={DollarSign}
        iconBgColor={netProfit >= 0 ? "bg-emerald-100" : "bg-red-100"}
        iconColor={netProfit >= 0 ? "text-emerald-600" : "text-red-600"}
      />

      <StatCard
        label="ROI"
        value={
          <span className={roi >= 20 ? "text-purple-600" : "text-slate-900"}>
            {roi.toFixed(1)}%
          </span>
        }
        icon={TrendingUp}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatCard
        label="Margin"
        value={`${profitMargin.toFixed(1)}%`}
        icon={Percent}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
        subContent={
          <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full custom-progress-bar ${profitMargin > 20 ? "bg-purple-500" : "bg-amber-500"}`}
              style={{ width: `${Math.min(profitMargin, 100)}%` }}
            ></div>
          </div>
        }
      />

      <StatCard
        label="Break Even"
        value={`Rs ${breakEven.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        icon={BarChart}
        iconBgColor="bg-amber-100"
        iconColor="text-amber-600"
      />
    </div>
  );
};
