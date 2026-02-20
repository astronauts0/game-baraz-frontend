import React from "react";
import { List } from "lucide-react";
import GridOptionIcon from "./GridOptionIcon";

interface MarketplaceContentHeaderProps {
  count: number;
  viewMode: "grid" | "list";
  gridColumns: number;
  onViewModeChange: (mode: "grid" | "list") => void;
  onGridColumnsChange: (cols: number) => void;
}

const MarketplaceContentHeader: React.FC<MarketplaceContentHeaderProps> = ({
  count,
  viewMode,
  gridColumns,
  onViewModeChange,
  onGridColumnsChange,
}) => {
  return (
    <div className="py-8 market-content-header">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        {/* Title & Count */}
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-2">
            Tactical Dossiers
          </h1>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs font-medium text-slate-500 uppercase tracking-widest">
              Found{" "}
              <span className="border border-black text-white bg-black px-1 text-sm">
                {count}
              </span>{" "}
              assets matching current parameters.
            </p>
            <div className="hidden sm:flex items-center text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              LIVE MARKET
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="md:flex items-center gap-4 hidden">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            View as
          </span>
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 gap-1 shadow-sm">
            {/* List View Button */}
            <button
              onClick={() => onViewModeChange("list")}
              className={`cursor-copy p-1.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-slate-100 shadow-inner text-black ring-1 ring-black/5"
                  : "text-slate-400 hover:text-black"
              }`}
              title="List View"
            >
              <List className="size-5 text-slate-600" />
            </button>

            <div className="w-px h-4 bg-slate-200 mx-1"></div>

            {/* Grid Column Buttons */}
            {[3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => {
                  onViewModeChange("grid");
                  onGridColumnsChange(num);
                }}
                className={`cursor-copy w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all ${
                  viewMode === "grid" && gridColumns === num
                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                    : "text-slate-400 hover:text-black hover:bg-slate-50"
                }`}
                title={`${num} Columns`}
              >
                <GridOptionIcon count={num} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContentHeader;
