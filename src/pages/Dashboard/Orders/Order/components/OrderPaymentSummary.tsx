import React from "react";
import type { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface OrderPaymentSummaryProps {
  order: Order;
}

export const OrderPaymentSummary: React.FC<OrderPaymentSummaryProps> = ({
  order,
}) => {
  const protectionFee = order.price * 0.025;
  const total = order.price + protectionFee;

  return (
    <Card>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 relative z-10">
          Payment Summary
        </h3>
        <div className="space-y-4 mb-6 relative z-10">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Subtotal</span>
            <span className="font-bold text-slate-900">
              Rs {order.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-slate-500 font-medium">Protection Fee</span>
              <span className="text-[10px] text-slate-400">
                Secure Escrow Protection (2.5%)
              </span>
            </div>
            <span className="font-bold text-slate-900">
              Rs {protectionFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-slate-500 font-medium">Tax</span>
            <span className="font-normal italic">Included</span>
          </div>
        </div>
        <div className="pt-4 border-t border-dashed border-slate-200 flex justify-between items-end relative z-10">
          <span className="font-bold text-slate-900 uppercase text-xs tracking-widest">
            Total Amount
          </span>
          <span className="text-2xl font-bold text-primary">
            Rs {total.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
