import React from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-12 border-l border-slate-300 pl-8 md:pl-16",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
            {stat.value}
          </div>
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
