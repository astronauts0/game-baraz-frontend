import InventoryChart from "@/components/charts/PieChart";
import { Card, CardContent } from "@/components/ui/card";
import { INVENTORY_DATA } from "@/constants";

interface DashboardPieChartProps {
  className?: string;
}

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent>
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
          Inventory Mix
        </h3>

        <InventoryChart chartData={INVENTORY_DATA} />
        <div className="mt-8 space-y-3">
          {INVENTORY_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPieChart;
