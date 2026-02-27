import React from "react";
import { Zap, MessageCircle, FileText } from "lucide-react";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderAssetCardProps {
  order: Order;
  onChat: (order: Order) => void;
}

export const OrderAssetCard: React.FC<OrderAssetCardProps> = ({
  order,
  onChat,
}) => {
  return (
    <Card>
      <CardContent>
        <div className=" flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Zap size={20} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wide">
            Asset Details
          </h3>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0">
            <img
              src={order.image}
              alt={order.assetName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 py-1">
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                {order.game}
              </span>
              <h2 className="text-2xl font-bold leading-tight">
                {order.assetName}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-tight">
                  Type
                </p>
                <p className="text-sm font-semibold">{order.type} Order</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-tight">
                  Delivery Method
                </p>
                <p className="text-sm font-semibold">Secure Escrow</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="w-full flex-1"
                size="lg"
                onClick={() => onChat(order)}
              >
                <MessageCircle size={16} /> Chat with Seller
              </Button>
              <Button variant="outline" size="icon-lg">
                <FileText size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
