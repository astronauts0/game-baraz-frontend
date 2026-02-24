import React from "react";
import { ArrowUpRight, Eye, CheckCircle } from "lucide-react";
import StatCard from "../../components/StatCard";

export const ListingsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Active Value"
        value="Rs 25,900"
        icon={ArrowUpRight}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        label="Total Views"
        value="4,740"
        icon={Eye}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        label="Items Sold"
        value="12"
        icon={CheckCircle}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
    </div>
  );
};
