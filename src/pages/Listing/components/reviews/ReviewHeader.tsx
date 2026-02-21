import React from "react";
import { Star, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewHeaderProps {
  onToggleWriteReview: () => void;
  isWritingReview: boolean;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  onToggleWriteReview,
  isWritingReview,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
            Seller Intelligence
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase">
            Verified buyer feedback & reputation
          </p>
        </div>
      </div>
      <Button onClick={onToggleWriteReview} className="cursor-copy">
        <SquarePen className="w-4 h-4" />
        {isWritingReview ? "Cancel Review" : "Write Review"}
      </Button>
    </div>
  );
};

export default ReviewHeader;
