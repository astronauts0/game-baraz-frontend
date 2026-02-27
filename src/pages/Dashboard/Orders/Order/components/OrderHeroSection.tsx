import React from "react";
import { Copy } from "lucide-react";
import type { Order } from "@/types";
import { getStatusStyles, handleCopy } from "./orderDetailUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderHeroSectionProps {
  order: Order;
}

export const OrderHeroSection: React.FC<OrderHeroSectionProps> = ({
  order,
}) => {
  const statusStyle = getStatusStyles(order.status);
  const StatusIcon = statusStyle.icon;

  return (
    <Card>
      <CardContent>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge
                className={` ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
              >
                <StatusIcon size={12} />
                {order.status}
              </Badge>
              <span>•</span>
              <span className="text-sm font-medium">{order.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Order #{order.id}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Transaction ID:</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                {order.id.split("-")[1] || "Unknown"}
              </code>
              <Button
                onClick={() => handleCopy(order.id)}
                variant="ghost"
                size="icon"
                className="cursor-copy"
              >
                <Copy size={14} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <p className="text-sm font-bold uppercase tracking-wider mb-1">
              Total Amount
            </p>
            <p className="text-4xl font-bold text-primary">
              Rs {order.price.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
