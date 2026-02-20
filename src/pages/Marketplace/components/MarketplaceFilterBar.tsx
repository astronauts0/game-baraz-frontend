import React from "react";
import FilterPill from "./FilterPill";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, Search } from "lucide-react";
import DropdownPrimary from "@/components/shared/DropdownPrimary";
import { sortOptions } from "@/constants";

interface MarketplaceFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  activeGame: string;
  games: string[];
  onGameChange: (game: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const MarketplaceFilterBar: React.FC<MarketplaceFilterBarProps> = ({
  search,
  onSearchChange,
  activeGame,
  games,
  onGameChange,
  showFilters,
  onToggleFilters,
  onSearchSubmit,
}) => {
  return (
    <div className="sm:sticky top-19 z-40 sm:bg-white/70 sm:backdrop-blur-lg sm:border sm:border-slate-200 sm:shadow-md sm:rounded-2xl">
      <div className="sm:py-6 pb-6">
        {/* Search Row */}
        <div className="flex justify-center w-full mb-6">
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="text-primary font-mono font-bold text-lg">
                {">"}
              </span>
            </div>
            <Input
              placeholder="INITIATE DATABASE SEARCH..."
              className="w-full cursor-copy rounded-2xl pl-10 pr-20 h-12 text-sm font-mono font-medium tracking-wide text-black border-black"
              value={search}
              type="search"
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearchSubmit && onSearchSubmit();
                }
              }}
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-auto">
              <Button
                size="sm"
                onClick={() => onSearchSubmit && onSearchSubmit()}
                variant="outline"
                className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide flex items-center gap-2 cursor-copy"
              >
                <Search className="size-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          <FilterPill
            label="All Sectors"
            active={activeGame === "All"}
            onClick={() => onGameChange("All")}
          />
          {games.slice(1).map((game) => (
            <FilterPill
              key={game}
              label={game}
              active={activeGame === game}
              onClick={() => onGameChange(game)}
            />
          ))}

          <div className="w-px h-6 bg-black mx-2 hidden sm:block"></div>

          <Button
            onClick={onToggleFilters}
            variant={showFilters ? "default" : "outline"}
            className="px-4 py-2 rounded-full text-[11px] border-black font-black uppercase tracking-wide flex items-center gap-1 cursor-copy"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>

          {/* Sort Dropdown */}
          <div className="relative group">
            {/* Sort Dropdown */}
            <DropdownPrimary
              defaultValue="recommended"
              options={sortOptions}
              triggerClassName="rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-wide border-black cursor-copy"
              contentClassName="rounded-xl"
              itemClassName="cursor-copy"
            />
          </div>
        </div>

        {/* Expanded Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-black grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in slide-in-from-top-2 fade-in duration-200 px-4 max-w-4xl mx-auto ">
            {/* Price Range */}
            <div className="space-y-2 ">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest cursor-copy">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-black rounded-lg py-2 px-3 text-sm font-bold focus:border-primary focus:ring-primary/20 text-black placeholder:text-black/80 cursor-copy"
                />
                <span className="font-bold">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-black rounded-lg py-2 px-3 text-sm font-bold focus:border-primary focus:ring-primary/20 text-black placeholder:text-black/80 cursor-copy"
                />
              </div>
            </div>

            {/* Seller Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest cursor-copy">
                Seller Status
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 group cursor-copy">
                  <Checkbox className="border-black cursor-copy" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-black">
                    Verified Sellers Only
                  </span>
                </label>
                <label className="flex items-center gap-2 group cursor-copy">
                  <Checkbox className="border-black cursor-copy" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-black">
                    Elite / Godlike Only
                  </span>
                </label>
              </div>
            </div>

            {/* Delivery Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Delivery Type
              </label>
              <div className="flex gap-2">
                <Button
                  className="flex-1 py-2 text-xs font-bold rounded-lg cursor-copy"
                  variant="default"
                >
                  Instant
                </Button>
                <Button
                  className="flex-1 py-2 text-xs font-bold rounded-lg border-black cursor-copy"
                  variant="outline"
                >
                  Manual
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceFilterBar;
