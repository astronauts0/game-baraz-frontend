import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Star,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import type { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AlertPrimary from "@/components/shared/Alert/AlertPrimary";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatSidebarProps {
  order: Order;
}

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; icon: React.ElementType; className: string }
> = {
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  Processing: {
    label: "Processing",
    icon: Loader2,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  Pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200",
  },
  Dispute: {
    label: "Dispute",
    icon: AlertTriangle,
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ order }) => {
  const statusCfg = STATUS_CONFIG[order.status];
  const StatusIcon = statusCfg.icon;
  const protectionFee = order.price * 0.025;
  const total = order.price + protectionFee;

  return (
    <ScrollArea className="h-full pr-4">
      <div className="flex flex-col gap-4 pb-4">
        {/* Asset Card */}
        <Card className="p-0 m-0 pb-5">
          <div className="h-50 relative">
            <img
              src={order.image}
              alt={order.assetName}
              className="size-full rounded-2xl"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
          </div>
          <CardContent className="space-y-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5">
                {order.game}
              </p>
              <p className="text-sm font-bold leading-tight line-clamp-2">
                {order.assetName}
              </p>
            </div>
            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase rounded-full border",
                  statusCfg.className,
                )}
              >
                <StatusIcon size={8} />
                {statusCfg.label}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Order ID</span>
              <span className="font-bold font-mono">#{order.id}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Type</span>
              <Badge
                className={cn(
                  order.type === "Buy"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-purple-50 text-purple-700 border-purple-200",
                )}
              >
                {order.type} Order
              </Badge>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold">
                  Rs {order.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Escrow Fee (2.5%)</span>
                <span className="font-semibold">
                  Rs {protectionFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold pt-1 border-t border-dashed border-slate-200">
                <span className="text-slate-800">Total</span>
                <span className="text-primary">
                  Rs {total.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counterparty */}
        <Card className="shrink-0">
          <CardContent>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3">
              Trading With
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-primary to-violet-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                {order.counterparty.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight truncate">
                  {order.counterparty}
                </p>
                <p className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold mt-0.5">
                  <ShieldCheck size={10} />
                  Verified Operative
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-slate-50 rounded-xl p-2.5 text-center border">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                  Rating
                </p>
                <div className="flex items-center justify-center gap-0.5">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <p className="font-bold text-xs">4.9</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 text-center border">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                  Deals
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Package size={10} className="text-slate-400" />
                  <p className="font-bold text-xs">120+</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertPrimary
          className="bg-amber-50 mb-5"
          title="Safety Note"
          description="Never communicate outside GameBazaar. Admins will never ask for your password or OTP. Ensure funds are in escrow before transferring assets."
          icon={
            <AlertTriangle
              size={16}
              className="text-amber-600 shrink-0 mt-0.5"
            />
          }
        />
      </div>
    </ScrollArea>
  );
};
