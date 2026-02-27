import {
  Clock,
  MessageCircle,
  ChevronRight,
  MoreVertical,
  FileText,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Order } from "@/types";
import { STATUS_COLORS, getStatusIcon } from "./orderUtils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderCardProps {
  order: Order;
  onChat?: (order: Order) => void;
  onInitiateDispute?: (order: Order) => void;
}

export const OrderCard = ({
  order,
  onChat,
  onInitiateDispute,
}: OrderCardProps) => {
  return (
    <Card className="p-0">
      {/* Card Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 rounded-t-2xl">
        <div className="flex items-center gap-4 text-sm font-sans">
          <span className="font-bold text-slate-700">{order.id}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock size={14} /> {order.date}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <Badge className={`py-1 shadow-sm ${STATUS_COLORS[order.status]}`}>
            {getStatusIcon(order.status)}
            <span className="ml-1.5 font-bold tracking-tight">
              {order.status.toUpperCase()}
            </span>
          </Badge>

          {/* Context Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
              >
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl shadow-xl border-slate-100 p-1"
            >
              <DropdownMenuItem asChild className="rounded-lg">
                <Link
                  to={`/dashboard/orders/${order.id}`}
                  className="flex items-center w-full px-2 py-2"
                >
                  <FileText size={16} className="text-slate-400 mr-2" />
                  <span className="text-sm font-medium">View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert("Invoice downloading...")}
                className="rounded-lg"
              >
                <Download size={16} className="text-slate-400 mr-2" />
                <span className="text-sm font-medium">Download Invoice</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                onClick={() => onInitiateDispute?.(order)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg"
              >
                <AlertTriangle size={16} className="mr-2" />
                <span className="text-sm font-medium">Report Issue</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 pt-0 flex flex-col md:flex-row items-center gap-6">
        {/* Thumbnail */}
        <Link
          to={`/dashboard/orders/${order.id}`}
          className="relative w-full md:w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group"
        >
          <img
            src={order.image}
            alt={order.assetName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm py-1 text-center">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {order.game}
            </span>
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <Badge
              variant="secondary"
              className={`${
                order.type === "Sell"
                  ? "bg-purple-50 text-purple-700 border-purple-100"
                  : "bg-emerald-50 text-emerald-700 border-emerald-100"
              } font-bold text-[10px] uppercase`}
            >
              {order.type}
            </Badge>
          </div>
          <Link to={`/dashboard/orders/${order.id}`}>
            <h3 className="text-lg font-bold hover:text-purple-600 transition-colors cursor-pointer leading-snug">
              {order.assetName}
            </h3>
          </Link>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-slate-500">
            <span className="text-xs">Counterparty:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200/50">
              <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                {order.counterparty.charAt(0)}
              </div>
              <span className="font-semibold text-slate-700 text-xs">
                {order.counterparty}
              </span>
            </div>
          </div>
        </div>

        {/* Price + Actions */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
          <div className="text-center md:text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">
              Total Amount
            </p>
            <p className="text-2xl font-bold text-slate-900 font-sans">
              <span className="text-slate-400 text-sm font-medium mr-1 uppercase">
                Rs
              </span>
              {order.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => onChat?.(order)}
              className="flex-1 md:flex-none h-10 border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600"
            >
              <MessageCircle size={16} className="mr-2 opacity-50" /> Chat
            </Button>
            <Button
              asChild
              className="flex-1 md:flex-none h-10 shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all"
            >
              <Link to={`/dashboard/orders/${order.id}`}>
                Details <ChevronRight size={16} className="ml-1 opacity-70" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
