import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyListingsStateProps {
  onCreateNew: () => void;
}

export const EmptyListingsState: React.FC<EmptyListingsStateProps> = ({
  onCreateNew,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
      <div className="p-4 bg-slate-50 rounded-full mb-4">
        <Filter size={32} className="text-slate-300" />
      </div>
      <p className="text-slate-900 font-bold">No listings found</p>
      <p className="text-slate-500 text-sm mt-1">
        Try adjusting your filters or create a new listing.
      </p>
      <Button
        onClick={onCreateNew}
        className="mt-6 px-6 h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
      >
        Create Listing
      </Button>
    </div>
  );
};
