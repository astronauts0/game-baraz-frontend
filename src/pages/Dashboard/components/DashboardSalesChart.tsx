import AreaChart from "@/components/charts/AreaChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SALES_DATA } from "@/constants";
import { useState } from "react";

interface DashboardSalesChartProps {
  className?: string;
}

const DashboardSalesChart: React.FC<DashboardSalesChartProps> = ({
  className,
}) => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Sales Activity
            </h3>
            <p className="text-sm text-slate-500">
              Net revenue over{" "}
              {timeframe === "day"
                ? "today's"
                : timeframe === "week"
                  ? "this week's"
                  : "last 30"}{" "}
              operational cycles
            </p>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full sm:w-[130px] h-8 text-xs font-medium bg-slate-50 border-slate-200 focus:ring-0">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AreaChart timeframe={timeframe} chartData={SALES_DATA} />
      </CardContent>
    </Card>
  );
};

export default DashboardSalesChart;
