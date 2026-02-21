import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Review } from "@/types";
import { initialReviews } from "@/data/appData";
import { Card, CardContent } from "@/components/ui/card";

// Sub-components
import ReviewHeader from "./reviews/ReviewHeader";
import ReviewStats from "./reviews/ReviewStats";
import ReviewFilters from "./reviews/ReviewFilters";
import ReviewItem from "./reviews/ReviewItem";
import ReviewForm from "./reviews/ReviewForm";
import { Button } from "@/components/ui/button";

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
  const [isWritingReview, setIsWritingReview] = useState(false);

  const handleHelpfulVote = (id: number) => {
    if (votedReviews.includes(id)) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)),
    );
    setVotedReviews((prev) => [...prev, id]);
  };

  const handleStarFilter = (rating: number) => {
    if (selectedStarFilter === rating) {
      setSelectedStarFilter(null);
    } else {
      setSelectedStarFilter(rating);
    }
  };

  const handleSubmitReview = (rating: number, content: string) => {
    const newReview: Review = {
      id: Date.now(),
      user: "You",
      avatar: "ME",
      rating: rating,
      date: "Just now",
      timestamp: Date.now(),
      verified: true,
      content: content,
      helpful: 0,
      images: [],
    };

    setReviews([newReview, ...reviews]);
    setIsWritingReview(false);
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

  const stats = useMemo(() => {
    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;
    reviews.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
      totalRating += r.rating;
    });
    return {
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      starCounts: counts,
      totalReviews: reviews.length,
    };
  }, [reviews]);

  const visibleReviews = filteredAndSortedReviews.slice(0, visibleCount);

  return (
    <Card className="mt-16 border-slate-100 shadow-sm overflow-hidden">
      <CardContent className="p-8">
        <ReviewHeader
          onToggleWriteReview={() => setIsWritingReview(!isWritingReview)}
          isWritingReview={isWritingReview}
        />

        {isWritingReview && (
          <ReviewForm
            onSubmit={handleSubmitReview}
            onClose={() => setIsWritingReview(false)}
          />
        )}

        <ReviewStats
          averageRating={stats.averageRating}
          starCounts={stats.starCounts}
          totalReviews={stats.totalReviews}
          onStarFilter={handleStarFilter}
          selectedStarFilter={selectedStarFilter}
        />

        <ReviewFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          visibleCount={visibleReviews.length}
          totalFilteredCount={filteredAndSortedReviews.length}
        />

        <div className="space-y-8">
          {visibleReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onHelpfulVote={handleHelpfulVote}
              isVoted={votedReviews.includes(review.id)}
            />
          ))}

          {visibleCount < filteredAndSortedReviews.length && (
            <div className="flex justify-center pt-8">
              <Button onClick={() => setVisibleCount((prev) => prev + 3)}>
                Load More Intel
              </Button>
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
      </CardContent>
    </Card>
  );
};

export default ListingReviews;
