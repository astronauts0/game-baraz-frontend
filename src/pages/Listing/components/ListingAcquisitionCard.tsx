import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  History,
  Gavel,
  Headphones,
} from "lucide-react";

interface ListingAcquisitionCardProps {
  id: number;
  price: number;
}

const ListingAcquisitionCard: React.FC<ListingAcquisitionCardProps> = ({
  id,
  price,
}) => {
  return (
    <div className="anim-card bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center">
          <Zap className="w-4 h-4 text-[#7C3AED]" />
        </div>
      </div>

      <div className="mb-8">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
          Acquisition Cost
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900 tracking-tight">
            ${price.toLocaleString()}.00
          </span>
          <span className="text-sm font-bold text-[#7C3AED]">USDC</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 mt-1">
          ≈ {(price * 1.0).toLocaleString()} USD (Fiat)
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Counter Offer (Optional)
          </label>
          <input
            type="text"
            placeholder="0.00"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <Link
          to={`/escrow/${id}`}
          className="w-full bg-linear-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide shadow-lg shadow-[#7C3AED]/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          Acquire Asset
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            Secured by GameBazaar Escrow
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <History className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            2-Day Money Back Guarantee
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Gavel className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            Anti-Fraud Protection
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Headphones className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            24/7 Priority Support Access
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingAcquisitionCard;
