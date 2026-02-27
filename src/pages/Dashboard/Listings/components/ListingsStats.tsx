import React from "react";
import { ArrowUpRight, Eye, CheckCircle } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { type DashboardListing } from "@/types";

interface ListingsStatsProps {
  listings: DashboardListing[];
}

export const ListingsStats: React.FC<ListingsStatsProps> = ({ listings }) => {
  const activeListings = listings.filter((l) => l.status === "Active");
  const totalValue = activeListings.reduce((sum, l) => sum + l.price, 0);
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
  const itemsSold = listings.filter((l) => l.status === "Sold").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Active Value"
        value={`Rs ${totalValue.toLocaleString()}`}
        icon={ArrowUpRight}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        label="Total Views"
        value={totalViews.toLocaleString()}
        icon={Eye}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        label="Items Sold"
        value={itemsSold.toString()}
        icon={CheckCircle}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
    </div>
  );
};
