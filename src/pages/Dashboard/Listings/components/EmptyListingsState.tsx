import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptyListingsState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 gap-2">
      <div className="p-4 bg-primary/20 rounded-full">
        <Filter size={32} className="text-primary" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-bold">No listings found</p>
        <p className="text-slate-500 text-sm">
          Try adjusting your filters or create a new listing.
        </p>
      </div>
      <Button >Create Listing</Button>
    </div>
  );
};
