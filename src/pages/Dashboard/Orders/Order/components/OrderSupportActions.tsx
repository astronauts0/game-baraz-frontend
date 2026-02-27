import React from "react";
import { AlertTriangle, HelpCircle } from "lucide-react";
import type { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface OrderSupportActionsProps {
  order: Order;
  onReport: (order: Order) => void;
}

export const OrderSupportActions: React.FC<OrderSupportActionsProps> = ({
  order,
  onReport,
}) => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-4">
          Support & Security
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onReport(order)}
            className="w-full text-left p-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3 border"
          >
            <div className="p-1.5 bg-red-100/50 rounded-lg">
              <AlertTriangle size={16} />
            </div>
            Report an Issue
          </button>
          <button className="w-full text-left p-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold flex items-center gap-3 border">
            <div className="p-1.5 bg-slate-100/50 rounded-lg">
              <HelpCircle size={16} />
            </div>
            Help Center
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
