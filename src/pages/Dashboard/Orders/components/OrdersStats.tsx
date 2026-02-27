import React from "react";
import { ShoppingBag, Clock, CheckCircle } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { type Order } from "@/types";

interface OrdersStatsProps {
  orders: Order[];
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const totalVolume = orders.reduce((sum, o) => sum + o.price, 0);
  const activeOrders = orders.filter(
    (o) => !["Completed", "Cancelled"].includes(o.status),
  ).length;
  const completedDeals = orders.filter((o) => o.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Volume"
        value={`Rs ${totalVolume.toLocaleString()}`}
        icon={ShoppingBag}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        label="Active Orders"
        value={activeOrders.toString()}
        icon={Clock}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        label="Completed Deals"
        value={completedDeals.toString()}
        icon={CheckCircle}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
    </div>
  );
};
