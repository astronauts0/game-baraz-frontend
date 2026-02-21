import React from "react";
import {
  BadgeCheck,
  Star,
  Package,
  ShieldCheck,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ListingAgentProfileProps {
  seller: string;
  sellerTier: string;
}

const ListingAgentProfile: React.FC<ListingAgentProfileProps> = ({
  seller,
  sellerTier,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg relative ${
                sellerTier === "GODLIKE"
                  ? "bg-linear-to-br from-amber-400 to-amber-600"
                  : sellerTier === "ELITE"
                    ? "bg-linear-to-br from-indigo-400 to-indigo-600"
                    : "bg-linear-to-br from-emerald-400 to-emerald-600"
              }`}
            >
              {seller.substring(0, 2).toUpperCase()}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <h4 className="font-display font-black text-slate-900 text-xl">
                {seller}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    sellerTier === "GODLIKE"
                      ? "bg-amber-100 text-amber-700"
                      : sellerTier === "ELITE"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {sellerTier} Agent
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  •
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div
            className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100"
            title="Identity Verified"
          >
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-slate-200 transition-colors">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
              <Star className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-slate-900 leading-none mb-1">
              4.9
            </div>
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              Rating (224)
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-slate-200 transition-colors">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-slate-900 leading-none mb-1">
              1.4k+
            </div>
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              Items Sold
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-slate-200 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-slate-900 leading-none mb-1">
              98%
            </div>
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              Trust Score
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-slate-200 transition-colors">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-slate-900 leading-none mb-1">
              15m
            </div>
            <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              Avg Response
            </div>
          </div>
        </div>

        {/* Recent Activity Mini-Feed */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Latest Feedback
            </span>
            <span className="text-[10px] font-bold text-slate-400">2h ago</span>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">
              B
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 mb-0.5">
                Buyer_992
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "Fastest delivery I've had on this site. Recommended."
              </p>
            </div>
          </div>
        </div>

        <button className="w-full bg-white border-2 border-slate-100 hover:border-primary hover:text-primary text-slate-600 py-3.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2 group">
          <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Contact Seller
        </button>
      </CardContent>
    </Card>
  );
};

export default ListingAgentProfile;
