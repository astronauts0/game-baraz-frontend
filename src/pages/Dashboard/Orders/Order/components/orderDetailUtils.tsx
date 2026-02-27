import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Ban,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export const getStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle,
      };
    case "Processing":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: Clock,
      };
    case "Pending":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Clock,
      };
    case "Cancelled":
      return {
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-200",
        icon: Ban,
      };
    case "Dispute":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: AlertTriangle,
      };
    default:
      return {
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-200",
        icon: HelpCircle,
      };
  }
};

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};
