import React from "react";
import { Star } from "lucide-react";

interface ReviewStatsProps {
  averageRating: number;
  starCounts: { [key: number]: number };
  totalReviews: number;
  onStarFilter: (rating: number) => void;
  selectedStarFilter: number | null;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({
  averageRating,
  starCounts,
  totalReviews,
  onStarFilter,
  selectedStarFilter,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-100">
      <div className="md:col-span-3 text-center md:text-left">
        <div className="text-5xl font-black text-slate-900 mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center md:justify-start gap-0.5 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
          ))}
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Average Rating
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = starCounts[star] || 0;
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <button
              key={star}
              onClick={() => onStarFilter(star)}
              className={`flex items-center gap-4 group cursor-pointer transition-opacity ${
                selectedStarFilter !== null && selectedStarFilter !== star
                  ? "opacity-40"
                  : "opacity-100"
              }`}
            >
              <div className="text-[10px] font-bold text-slate-500 w-4">
                {star}
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-[10px] font-black text-slate-400 w-8">
                {Math.round(percentage)}%
              </div>
            </button>
          );
        })}
      </div>

      <div className="md:col-span-4 flex flex-col justify-end">
        {/* Placeholder for future content or alignments */}
      </div>
    </div>
  );
};

export default ReviewStats;
