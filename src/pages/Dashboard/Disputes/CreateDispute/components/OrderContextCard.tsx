import React from "react";
import type { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface OrderContextCardProps {
  order: Order;
}

export const OrderContextCard: React.FC<OrderContextCardProps> = ({
  order,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
            <img
              src={order.image}
              alt={order.assetName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">
              {order.game}
            </p>
            <h4 className="font-bold text-sm leading-tight">
              {order.assetName}
            </h4>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{order.date.split("•")[0]}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-bold">Rs {order.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-muted-foreground">Counterparty</span>
            <span className="px-2 py-0.5 bg-secondary text-white rounded text-xs font-bold">
              {order.counterparty}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
