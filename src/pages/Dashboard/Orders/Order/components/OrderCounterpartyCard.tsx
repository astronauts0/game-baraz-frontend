import React from "react";
import { Shield } from "lucide-react";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderCounterpartyCardProps {
  order: Order;
  onChat: (order: Order) => void;
}

export const OrderCounterpartyCard: React.FC<OrderCounterpartyCardProps> = ({
  order,
  onChat,
}) => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-4">
          Trading With
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-semibold text-lg border border-slate-100">
            {order.counterparty.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">
              {order.counterparty}
            </p>
            <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1 uppercase">
              <Shield size={12} className="text-emerald-500" /> Verified
              Operative
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50/80 rounded-xl p-3 text-center border">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              Rating
            </p>
            <p className="font-bold text-slate-900">4.9/5.0</p>
          </div>
          <div className="bg-slate-50/80 rounded-xl p-3 text-center border">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              Deals
            </p>
            <p className="font-bold text-slate-900">120+</p>
          </div>
        </div>
        <div className="pt-6">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onChat(order)}
          >
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
