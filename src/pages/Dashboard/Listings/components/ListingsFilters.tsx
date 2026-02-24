import React from "react";

type StatusType = "All" | "Active" | "Draft" | "Sold";

interface ListingsFiltersProps {
  statusFilter: StatusType;
  setStatusFilter: (status: StatusType) => void;
}

export const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const tabs: StatusType[] = ["All", "Active", "Draft", "Sold"];

  return (
    <div className="border-b border-slate-200 flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setStatusFilter(tab)}
          className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${
            statusFilter === tab
              ? "text-purple-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {tab}
          {statusFilter === tab && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-full"></span>
          )}
        </button>
      ))}
    </div>
  );
};
