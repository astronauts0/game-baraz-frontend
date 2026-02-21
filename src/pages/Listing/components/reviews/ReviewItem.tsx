import React from "react";
import { Star, BadgeCheck, ThumbsUp, Reply } from "lucide-react";
import type { Review } from "@/types";

interface ReviewItemProps {
  review: Review;
  onHelpfulVote: (id: number) => void;
  isVoted: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onHelpfulVote,
  isVoted,
}) => {
  return (
    <div className="group pb-8 border-b border-slate-100 last:border-none last:pb-0">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
            {review.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">
                {review.user}
              </span>
              {review.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-2.5 h-2.5 ${
                    s <= review.rating
                      ? "text-amber-400 fill-current"
                      : "text-slate-200"
                  }`}
                />
              ))}
              <span className="text-[9px] font-bold text-slate-400 ml-1">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onHelpfulVote(review.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all cursor-copy ${
            isVoted
              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
              : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black">{review.helpful}</span>
        </button>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-medium mb-4">
        {review.content}
      </p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((img, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
            >
              <img
                src={img}
                alt="Review"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {review.sellerResponse && (
        <div className="bg-slate-50 rounded-2xl p-4 border-l-4 border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Reply className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">
              Agent's Response
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium italic">
            "{review.sellerResponse}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
