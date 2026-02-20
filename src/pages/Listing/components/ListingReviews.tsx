import React, { useState, useMemo } from "react";
import {
  Star,
  SquarePen,
  X,
  BadgeCheck,
  ThumbsUp,
  Reply,
  Search,
} from "lucide-react";
import type { Review } from "@/types";
import { initialReviews } from "@/data/appData";

const ListingReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "photos" | "verified"
  >("all");
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(
    null,
  );
  const [sortOption, setSortOption] = useState<"recent" | "highest" | "lowest">(
    "recent",
  );
  const [visibleCount, setVisibleCount] = useState(3);
  const [votedReviews, setVotedReviews] = useState<number[]>([]);

  // Write Review State
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewHover, setNewReviewHover] = useState(0);

  const handleHelpfulVote = (id: number) => {
    if (votedReviews.includes(id)) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)),
    );
    setVotedReviews((prev) => [...prev, id]);
  };

  const handleStarClick = (rating: number) => {
    if (selectedStarFilter === rating) {
      setSelectedStarFilter(null);
    } else {
      setSelectedStarFilter(rating);
    }
  };

  const handleSubmitReview = () => {
    if (newReviewRating === 0) return;
    if (!newReviewContent.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      user: "You",
      avatar: "ME",
      rating: newReviewRating,
      date: "Just now",
      timestamp: Date.now(),
      verified: true,
      content: newReviewContent,
      helpful: 0,
      images: [],
    };

    setReviews([newReview, ...reviews]);
    setIsWritingReview(false);
    setNewReviewRating(0);
    setNewReviewContent("");
    setActiveFilter("all");
    setSelectedStarFilter(null);
    setSortOption("recent");
  };

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];
    if (activeFilter === "photos") {
      result = result.filter((r) => r.images && r.images.length > 0);
    } else if (activeFilter === "verified") {
      result = result.filter((r) => r.verified);
    }
    if (selectedStarFilter !== null) {
      result = result.filter((r) => r.rating === selectedStarFilter);
    }
    if (sortOption === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      result.sort((a, b) => b.timestamp - a.timestamp);
    }
    return result;
  }, [reviews, activeFilter, sortOption, selectedStarFilter]);

  const visibleReviews = filteredAndSortedReviews.slice(0, visibleCount);

  return (
    <div className="mt-16 anim-card bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200">
      {/* Header with Write Review Button */}
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
        <button
          onClick={() => setIsWritingReview(!isWritingReview)}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2"
        >
          <SquarePen className="w-4 h-4" />
          Write Review
        </button>
      </div>

      {/* Write Review Form */}
      {isWritingReview && (
        <div className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-slate-900">
              Submit Feedback
            </h4>
            <button
              onClick={() => setIsWritingReview(false)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setNewReviewHover(star)}
                onMouseLeave={() => setNewReviewHover(0)}
                onClick={() => setNewReviewRating(star)}
                className="focus:outline-none transition-transform active:scale-90"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (newReviewHover || newReviewRating)
                      ? "text-amber-400 fill-current"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
            <span className="text-[10px] font-black text-slate-400 uppercase ml-2">
              {newReviewRating > 0
                ? `${newReviewRating} Stars`
                : "Rate Product"}
            </span>
          </div>

          <textarea
            value={newReviewContent}
            onChange={(e) => setNewReviewContent(e.target.value)}
            placeholder="Share your experience with this asset and agent..."
            className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 min-h-[120px] mb-4"
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleSubmitReview}
              disabled={newReviewRating === 0 || !newReviewContent.trim()}
              className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Feedback
            </button>
          </div>
        </div>
      )}

      {/* Stats Summary & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-100">
        <div className="md:col-span-3 text-center md:text-left">
          <div className="text-5xl font-black text-slate-900 mb-2">4.9</div>
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
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className={`flex items-center gap-4 group cursor-pointer ${
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
                  className={`h-full bg-amber-400 transition-all duration-500 ${
                    star === 5
                      ? "w-[85%]"
                      : star === 4
                        ? "w-[12%]"
                        : star === 3
                          ? "w-[2%]"
                          : "w-[1%]"
                  }`}
                ></div>
              </div>
              <div className="text-[10px] font-black text-slate-400 w-8">
                {star === 5 ? "85%" : star === 4 ? "12%" : "2%"}
              </div>
            </button>
          ))}
        </div>

        <div className="md:col-span-4 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2">
            {(["all", "photos", "verified"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sorting & Result Count */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Showing {visibleReviews.length} of {filteredAndSortedReviews.length}{" "}
          Records
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          className="bg-transparent border-none text-[10px] font-black text-slate-900 uppercase tracking-widest focus:ring-0 cursor-pointer"
        >
          <option value="recent">Sort: Most Recent</option>
          <option value="highest">Sort: Top Rated</option>
          <option value="lowest">Sort: Lowest Rated</option>
        </select>
      </div>

      {/* Review Cards */}
      <div className="space-y-8">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="group pb-8 border-b border-slate-100 last:border-none last:pb-0"
          >
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
                onClick={() => handleHelpfulVote(review.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
                  votedReviews.includes(review.id)
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
        ))}

        {visibleCount < filteredAndSortedReviews.length && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-8 py-3 rounded-xl border-2 border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
            >
              Load More Intel
            </button>
          </div>
        )}

        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              No matching feedback records found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingReviews;
