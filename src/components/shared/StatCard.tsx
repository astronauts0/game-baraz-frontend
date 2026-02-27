import React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subContent?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  subContent,
  iconBgColor = "bg-slate-100",
  iconColor = "text-slate-600",
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider">
            {label}
          </h3>
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBgColor}`}>
              <Icon size={18} className={iconColor} />
            </div>
          )}
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="text-3xl font-bold text-slate-900">{value}</div>
          {subContent}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
