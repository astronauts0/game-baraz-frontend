import React, { useState } from "react";
import {
  History,
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import type { Transaction } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import { Card, CardContent } from "@/components/ui/card";

interface WalletActivityTimelineProps {
  transactions: Transaction[];
}

export const WalletActivityTimeline: React.FC<WalletActivityTimelineProps> = ({
  transactions,
}) => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <div className="mb-5 flex justify-between items-center">
          <h3 className="text-xs font-bold  uppercase tracking-wider flex items-center gap-2">
            <History size={16} /> Recent Transactions
          </h3>
          <button
            onClick={() => setHistoryModalOpen(true)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {(transactions || []).slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    tx.type === "Withdrawal"
                      ? "bg-slate-200 text-slate-500"
                      : tx.type === "Purchase"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {tx.type === "Deposit" || tx.type === "Revenue" ? (
                    <ArrowDownLeft size={18} />
                  ) : (
                    <ArrowUpRight size={18} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold ">{tx.label}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span>{tx.id}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    (tx.amount || 0) > 0 ? "text-emerald-600" : ""
                  }`}
                >
                  {(tx.amount || 0) > 0 ? "+" : ""} Rs{" "}
                  {Math.abs(tx.amount || 0).toLocaleString()}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <button
            onClick={() => setHistoryModalOpen(true)}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 uppercase tracking-wide"
          >
            View Full History
          </button>
        </div>
      </CardContent>

      <ModalPrimary
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        title="Transaction History"
      >
        <ScrollArea className="max-h-[60vh] -mx-6 px-6">
          <div className="divide-y divide-slate-100">
            {(transactions || []).map((tx) => (
              <div
                key={tx.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      tx.type === "Withdrawal"
                        ? "bg-slate-100 text-slate-500"
                        : tx.type === "Purchase"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {tx.type === "Deposit" || tx.type === "Revenue" ? (
                      <ArrowDownLeft size={16} />
                    ) : (
                      <ArrowUpRight size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold ">
                      {tx.label}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold ${
                      (tx.amount || 0) > 0
                        ? "text-emerald-600"
                        : ""
                    }`}
                  >
                    {(tx.amount || 0) > 0 ? "+" : ""} Rs{" "}
                    {Math.abs(tx.amount || 0).toLocaleString()}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </ModalPrimary>
    </Card>
  );
};
