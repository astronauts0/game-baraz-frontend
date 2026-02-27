import React from "react";
import SelectBoxPrimary from "@/components/shared/Form/SelectBoxPrimary";

interface ReviewFiltersProps {
  activeFilter: "all" | "photos" | "verified";
  setActiveFilter: (filter: "all" | "photos" | "verified") => void;
  sortOption: "recent" | "highest" | "lowest";
  setSortOption: (option: "recent" | "highest" | "lowest") => void;
  visibleCount: number;
  totalFilteredCount: number;
}

const sortOptions = [
  { label: "Sort: Most Recent", value: "recent" },
  { label: "Sort: Top Rated", value: "highest" },
  { label: "Sort: Lowest Rated", value: "lowest" },
];

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeFilter,
  setActiveFilter,
  sortOption,
  setSortOption,
  visibleCount,
  totalFilteredCount,
}) => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "photos", "verified"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 cursor-copy py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                activeFilter === filter
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Showing {visibleCount} of {totalFilteredCount} Records
        </div>

        <SelectBoxPrimary
          value={sortOption}
          onChange={(value) =>
            setSortOption(value as "recent" | "highest" | "lowest")
          }
          options={sortOptions}
        />
      </div>
    </div>
  );
};

export default ReviewFilters;
