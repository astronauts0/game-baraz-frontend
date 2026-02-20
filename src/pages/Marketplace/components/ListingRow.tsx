import React from "react";
import { Star, Package, ShieldCheck } from "lucide-react";
import type { Listing } from "@/types";
import { formatMetric } from "@/utils/functions";

interface ListingRowProps {
  data: Listing;
  onClick: (listing: Listing) => void;
}

const ListingRow: React.FC<ListingRowProps> = ({ data, onClick }) => {
  return (
    <div
      onClick={() => onClick(data)}
      className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group mb-4 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="w-full md:w-64 shrink-0 aspect-video md:aspect-4/3 rounded-xl overflow-hidden relative">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-black text-white/90 bg-slate-900/60 backdrop-blur px-2 py-0.5 rounded uppercase">
            {data.game}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          {data.badges.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded border border-slate-200"
            >
              {b}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          {data.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">
                {stat.label}
              </div>
              <div className="text-xs font-bold text-slate-700">
                {stat.value}
              </div>
            </div>
          ))}

          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

          {/* Seller Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" title="Seller Rating">
              <Star className="size-4 text-amber-400" />
              <div className="text-xs font-bold text-slate-700">
                {data.sellerStats.rating}{" "}
                <span className="text-[10px] text-slate-400 font-medium">
                  ({data.sellerStats.reviews})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5" title="Items Sold">
              <Package className="size-4 text-primary" />
              <div className="text-xs font-bold text-slate-700">
                {formatMetric(data.sellerStats.sold)}{" "}
                <span className="text-[10px] text-slate-400 font-medium">
                  Sold
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5" title="Trust Score">
              <ShieldCheck className="size-4 text-emerald-500" />
              <div className="text-xs font-bold text-slate-700">
                {data.sellerStats.trust}%{" "}
                <span className="text-[10px] text-slate-400 font-medium">
                  Trust
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="md:w-48 shrink-0 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
        <div className="text-2xl font-black text-slate-900 mb-1">
          ${data.price.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
              data.sellerTier === "GODLIKE"
                ? "bg-amber-500"
                : data.sellerTier === "ELITE"
                  ? "bg-indigo-500"
                  : "bg-emerald-500"
            }`}
          >
            {data.seller.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-xs font-bold text-slate-500">{data.seller}</div>
        </div>
        <div className="w-full space-y-2">
          <button className="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-slate-900/10">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingRow;
