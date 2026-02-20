import type { Listing } from "@/types";
import { formatMetric } from "@/utils/functions";
import { Button } from "../ui/button";
import { ArrowRight, BadgeCheck, Package, Star } from "lucide-react";

const ListingCard = ({
  data,
  onClick,
}: {
  data: Listing;
  onClick: (l: Listing) => void;
}) => {
  return (
    <div
      onClick={() => onClick(data)}
      className="h-full cursor-pointer group select-none"
    >
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300 transition-all duration-300 flex flex-col h-full relative">
        {/* Image Area */}
        <div className="relative bg-slate-100 overflow-hidden aspect-square sm:aspect-[4/3.5]">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Top Right Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-10">
            {data.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="px-2 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-wide rounded-md shadow-sm border border-slate-100/50"
              >
                {b}
              </span>
            ))}
          </div>

          {/* View Details Button (Hover) */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <Button className="w-full font-medium" variant="outline">
              <span>View Asset</span>
              <ArrowRight size={28} />
            </Button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Title & Type */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider">
                  {data.game}
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${data.deliveryTime === "Instant" ? "bg-emerald-500 animate-pulse" : "bg-amber-400"}`}
                  ></span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {data.deliveryTime}
                  </span>
                </div>
              </div>
              <div className="text-lg font-black tracking-tight group-hover:scale-110">
                ${data.price.toLocaleString()}
              </div>
            </div>
            <h3 className="font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {data.title}
            </h3>
          </div>

          {/* Item Stats Grid (Game Specific) */}
          <div className="grid grid-cols-2 gap-2">
            {data.stats.slice(0, 2).map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-lg px-3 py-2 border border-slate-100"
              >
                <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100">
            {/* Detailed Seller Stats Row */}
            <div className="flex items-center justify-between bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 mb-4">
              {/* Rating */}
              <div className="flex flex-col items-center px-2 flex-1 border-r border-slate-200 last:border-0">
                <div className="flex items-center gap-1 text-xs font-black">
                  <Star size={16} className="text-amber-400" />
                  {data.sellerStats.rating}
                </div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide scale-90">
                  {data.sellerStats.reviews} Revs
                </div>
              </div>

              {/* Sold */}
              <div className="flex flex-col items-center px-2 flex-1 border-r border-slate-200 last:border-0">
                <div className="flex items-center gap-1 text-xs font-black">
                  <Package size={16} className="text-primary" />
                  {formatMetric(data.sellerStats.sold)}
                </div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide scale-90">
                  Sold
                </div>
              </div>

              {/* Trust */}
              <div className="flex flex-col items-center px-2 flex-1">
                <div className="flex items-center gap-1 text-xs font-black">
                  <BadgeCheck size={16} className="text-emerald-500" />
                  {data.sellerStats.trust}%
                </div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide scale-90">
                  Trust
                </div>
              </div>
            </div>

            {/* Footer: Seller Identity & Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 group/seller">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shadow-sm ring-2 ring-white relative transition-transform group-hover/seller:scale-105 ${
                    data.sellerTier === "GODLIKE"
                      ? "bg-linear-to-br from-amber-400 to-amber-600"
                      : data.sellerTier === "ELITE"
                        ? "bg-linear-to-br from-indigo-400 to-indigo-600"
                        : "bg-linear-to-br from-emerald-400 to-emerald-600"
                  }`}
                >
                  {data.seller.substring(0, 2).toUpperCase()}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold leading-none group-hover/seller:text-primary transition-colors">
                    {data.seller}
                  </span>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider mt-1 flex items-center gap-0.5 ${
                      data.sellerTier === "GODLIKE"
                        ? "text-amber-500"
                        : data.sellerTier === "ELITE"
                          ? "text-indigo-500"
                          : "text-emerald-500"
                    }`}
                  >
                    {data.sellerTier}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
