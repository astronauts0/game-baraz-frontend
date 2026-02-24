import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ListingsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateNew: () => void;
}

export const ListingsHeader: React.FC<ListingsHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onCreateNew,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight uppercase">
          My Listings
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your active assets, drafts, and inventory history.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64 h-10 shadow-sm"
          />
        </div>

        <Button
          onClick={onCreateNew}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-10 shadow-md shadow-purple-200"
        >
          <Plus size={18} /> Create New
        </Button>
      </div>
    </div>
  );
};
