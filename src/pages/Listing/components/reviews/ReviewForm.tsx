import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  onSubmit: (rating: number, content: string) => void;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    if (rating === 0 || !content.trim()) return;
    onSubmit(rating, content);
  };

  return (
    <div className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-black uppercase tracking-wide text-slate-900">
          Submit Feedback
        </h4>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className="focus:outline-none cursor-copy transition-transform active:scale-90"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hover || rating)
                  ? "text-amber-400 fill-current"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
        <span className="text-[10px] font-black text-slate-400 uppercase ml-2">
          {rating > 0 ? `${rating} Stars` : "Rate Product"}
        </span>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your experience with this asset and agent..."
        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 min-h-[120px] mb-4"
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || !content.trim()}
          className="cursor-copy disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Feedback
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
