import React from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { transactions } from "@/data/appData";
import ComingSoonOverlay from "@/components/shared/ComingSoonOverlay";

const LiveLedger: React.FC = () => {
  return (
    <div className="lg:col-span-5 vault-card glass_box p-5 md:p-10 flex flex-col relative">
      <ComingSoonOverlay
        message="Coming Soon"
        subtitle="Live transaction feed enabled shortly."
      />

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-900">
          Live Ledger
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono text-red-500 font-bold">
            LIVE_FEED
          </span>
        </div>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {transactions.map((tx, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tx.type === "DEPOSIT"
                    ? "bg-emerald-100 text-emerald-600"
                    : tx.type === "PAYOUT"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {tx.type === "DEPOSIT" ? (
                  <ArrowDown size={16} />
                ) : tx.type === "PAYOUT" ? (
                  <ArrowUp size={16} />
                ) : (
                  <Search size={16} />
                )}
              </div>
              <div>
                <div className="font-bold text-slate-700">
                  {tx.type} <span className="text-slate-300 mx-1">/</span>{" "}
                  {tx.user}
                </div>
                <div className="text-[10px] text-slate-400">{tx.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900">{tx.amount}</div>
              <div className="text-[9px] font-bold text-emerald-500">
                {tx.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveLedger;
