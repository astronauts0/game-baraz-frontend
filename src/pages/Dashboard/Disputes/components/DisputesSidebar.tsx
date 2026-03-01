import React, { useState } from "react";
import { Search, CheckCircle, AlertTriangle } from "lucide-react";
import type { Dispute } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DisputesSidebarProps {
  disputes: Dispute[];
  selectedDisputeId: string | null;
  onSelectDispute: (id: string) => void;
}

export const DisputesSidebar: React.FC<DisputesSidebarProps> = ({
  disputes,
  selectedDisputeId,
  onSelectDispute,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"Active" | "Closed">("Active");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900";
      case "Closed":
        return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
      default:
        return "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const isActive = d.status === "Open" || d.status === "Under Review";
    const matchesFilter = filter === "Active" ? isActive : !isActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="w-full md:w-80 lg:w-96 flex flex-col shrink-0 shadow-sm border-slate-200 dark:border-slate-800 rounded-2xl h-full overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search Case ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("Active")}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors border",
              filter === "Active"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-900",
            )}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Closed")}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors border",
              filter === "Closed"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-900",
            )}
          >
            Closed
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2 p-2">
          {filteredDisputes.map((dispute) => (
            <div
              key={dispute.id}
              onClick={() => onSelectDispute(dispute.id)}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all border",
                selectedDisputeId === dispute.id
                  ? "bg-red-50/50 border-red-200 shadow-sm dark:bg-red-950/20 dark:border-red-900/50"
                  : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 dark:bg-transparent dark:hover:bg-slate-900/50 dark:hover:border-slate-800",
              )}
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">
                  {dispute.id}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-2 py-0 uppercase font-bold border",
                    getStatusColor(dispute.status),
                  )}
                >
                  {dispute.status}
                </Badge>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 line-clamp-1">
                {dispute.reason}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                Ref: {dispute.orderId}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {dispute.dateOpened}
                </span>
                {dispute.priority === "High" && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-500">
                    <AlertTriangle size={10} /> High Priority
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredDisputes.length === 0 && (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 dark:text-slate-600">
                <CheckCircle size={24} />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                No {filter} Disputes
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {filter === "Active"
                  ? "Your account is in good standing."
                  : "No closed cases found."}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
