import React from "react";
import { Plus, Banknote, ChevronRight } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button className="w-full group flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
              <Plus size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              List New Asset
            </span>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-400 group-hover:translate-x-1 transition-transform"
          />
        </button>

        <button className="w-full group flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
              <Banknote size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Withdraw Funds
            </span>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-400 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
