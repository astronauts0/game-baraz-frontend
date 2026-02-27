import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { Order } from "@/types";

export const STATUS_COLORS: Record<Order["status"], string> = {
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Processing: "bg-blue-100 text-blue-700 border-blue-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  Dispute: "bg-red-100 text-red-700 border-red-200",
};

export const getStatusIcon = (status: Order["status"]): React.ReactNode => {
  switch (status) {
    case "Completed":
      return <CheckCircle size={14} className="mr-1" />;
    case "Processing":
      return <Clock size={14} className="mr-1 animate-pulse" />;
    case "Cancelled":
      return <XCircle size={14} className="mr-1" />;
    default:
      return null;
  }
};
