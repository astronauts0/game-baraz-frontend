import { useState, useRef, useEffect } from "react";
import { Search, Filter, CheckCircle } from "lucide-react";

type TypeFilter = "All" | "Buy" | "Sell";

interface OrdersHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (t: TypeFilter) => void;
}

const TYPE_OPTIONS: TypeFilter[] = ["All", "Buy", "Sell"];

export const OrdersHeader = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: OrdersHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MY ORDERS</h1>
        <p className="text-slate-500 mt-1">
          Track and manage your asset transactions.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search Order ID, Asset..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 w-64 shadow-sm transition-all"
          />
        </div>

        {/* Type Filter */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`p-2.5 border rounded-xl shadow-sm transition-all flex items-center gap-2 text-sm font-semibold ${
              isFilterOpen || typeFilter !== "All"
                ? "bg-purple-50 border-purple-200 text-purple-700"
                : "bg-white border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-200"
            }`}
          >
            <Filter size={18} />
            {typeFilter !== "All" && <span>{typeFilter}</span>}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-1">
                {TYPE_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onTypeFilterChange(t);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      typeFilter === t
                        ? "bg-purple-50 text-purple-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {t} Orders
                    {typeFilter === t && <CheckCircle size={14} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
