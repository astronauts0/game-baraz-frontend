import { listings } from "@/data/appData";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Listings: React.FC = () => {
  return (
    <section id="marketplace" className="py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">
              Fresh Loot
            </h2>
            <p className="text-slate-500">
              Hand-picked accounts. No bans, no recalls, just pure OP status.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="hidden md:flex items-center space-x-2 text-primary font-bold hover:underline transition-all"
          >
            <span>Browse all stash</span>
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl p-4 transition-all hover:scale-[1.02] border border-slate-200 hover:border-primary/30 hover:shadow-xl relative overflow-hidden ${item.isFeatured ? "scale-105 z-10 border-primary/40 shadow-2xl shadow-primary/10 ring-1 ring-primary/10" : "shadow-sm"}`}
            >
              {item.badges.map((badge, idx) => (
                <div key={idx} className="absolute top-6 right-6 z-10">
                  <span
                    className={`${badge.bgClass} ${badge.colorClass} ${badge.borderClass} text-[10px] font-black uppercase px-2 py-1 rounded-md border shadow-sm`}
                  >
                    {badge.text}
                  </span>
                </div>
              ))}

              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                <img
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${item.isFeatured ? "group-hover:scale-110" : "grayscale group-hover:grayscale-0"}`}
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
              </div>

              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-display tracking-tight mb-1 text-slate-900">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[10px] text-slate-500 font-mono space-x-2">
                      <span>FROM: {item.seller}</span>
                      <span>•</span>
                      <span className={`${item.sellerStatusColor} font-bold`}>
                        {item.sellerStatus}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-primary font-black text-lg">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase text-slate-500">
                  {item.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col sm:block"
                    >
                      <span className="text-slate-400 mr-1">{stat.label}:</span>
                      <span className="text-slate-700">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-colors ${item.isFeatured ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90" : "bg-slate-100 hover:bg-slate-200 text-slate-900"}`}
                >
                  {item.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listings;
