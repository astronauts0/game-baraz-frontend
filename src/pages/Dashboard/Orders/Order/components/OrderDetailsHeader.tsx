import React from "react";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsHeaderProps {
  onBack: () => void;
}

export const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({
  onBack,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
      <button
        onClick={onBack}
        className="group flex items-center gap-2"
      >
        <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:bg-slate-100 transition-colors">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-bold">Back to Orders</span>
      </button>

      <div className="flex gap-3">
        <Button variant="outline">
          <Share2 size={16} /> Share Receipt
        </Button>
        <Button variant="outline">
          <Download size={16} /> Invoice
        </Button>
      </div>
    </div>
  );
};
