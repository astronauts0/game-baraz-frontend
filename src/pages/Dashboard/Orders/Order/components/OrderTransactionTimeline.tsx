import React from "react";
import { CheckCircle, CreditCard, Clock, type LucideIcon } from "lucide-react";
import type { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: string | number;
  title: string;
  description: string;
  icon: LucideIcon;
  status: "completed" | "active" | "pending" | "cancelled";
  date?: string;
}

interface OrderTransactionTimelineProps {
  order: Order;
  customSteps?: TimelineStep[];
}

const TimelineItem: React.FC<{ step: TimelineStep; isLast: boolean }> = ({
  step,
  isLast,
}) => {
  const getStatusStyles = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500 text-white border-emerald-100 shadow-emerald-100";
      case "active":
        return "bg-slate-900 text-white border-white shadow-md";
      case "cancelled":
        return "bg-red-50 text-red-400 border-red-50 shadow-none";
      default:
        return "bg-slate-100 border-white shadow-sm";
    }
  };

  const getTitleStyles = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return "text-emerald-700";
      case "cancelled":
        return "text-red-600";
      case "pending":
        return "text-black";
      default:
        return "text-slate-900";
    }
  };

  return (
    <div className="relative flex gap-6">
      {!isLast && (
        <div className="absolute left-[27px] top-14 bottom-[-32px] w-px bg-black"></div>
      )}
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 z-10 transition-all duration-300",
          getStatusStyles(step.status),
        )}
      >
        <step.icon size={20} />
      </div>
      <div className="pt-2 pb-8">
        <h4 className={cn("text-base font-bold", getTitleStyles(step.status))}>
          {step.title}
        </h4>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          {step.description}
        </p>
        {step.date && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mt-2 block">
            {step.date}
          </span>
        )}
      </div>
    </div>
  );
};

export const OrderTransactionTimeline: React.FC<
  OrderTransactionTimelineProps
> = ({ order, customSteps }) => {
  const defaultSteps: TimelineStep[] = [
    {
      id: "placed",
      title: "Order Placed",
      description: `Order #${order.id} was created on ${order.date}`,
      icon: CheckCircle,
      status: "completed",
      date: order.date,
    },
    {
      id: "payment",
      title: "Payment Verified",
      description:
        order.status === "Cancelled"
          ? "Payment was cancelled or failed."
          : "Funds are successfully held in secure escrow.",
      icon: CreditCard,
      status: order.status === "Cancelled" ? "cancelled" : "completed",
    },
    {
      id: "delivery",
      title:
        order.status === "Completed" ? "Asset Delivered" : "Delivery Status",
      description:
        order.status === "Completed"
          ? "Transaction completed successfully."
          : order.status === "Cancelled"
            ? "Order was cancelled."
            : "Seller is preparing your asset.",
      icon: order.status === "Completed" ? CheckCircle : Clock,
      status:
        order.status === "Completed"
          ? "completed"
          : order.status === "Cancelled"
            ? "cancelled"
            : "pending",
    },
  ];

  const steps = customSteps || defaultSteps;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Transaction Journey
          </h3>
          <div className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-tight">
            Step {steps.filter((s) => s.status === "completed").length} of{" "}
            {steps.length}
          </div>
        </div>

        <div className="relative space-y-0">
          {steps.map((step, index) => (
            <TimelineItem
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
