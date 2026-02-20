import React from "react";
import {
  Package,
  MailCheck,
  Star,
  DollarSign,
  Globe,
  Ban,
  Award,
} from "lucide-react";

const ListingAssetManifest: React.FC = () => {
  return (
    <div className="anim-card bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
            Asset Manifest
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase">
            Verified features and inventory highlights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        {/* Manifest Item 1 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <MailCheck className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              OG Email Included
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">
            Verified
          </span>
        </div>

        {/* Manifest Item 2 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              Champions 2021 Vandal
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
            Rare
          </span>
        </div>

        {/* Manifest Item 3 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              $1,200 Spent History
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400">
            Ledger
          </span>
        </div>

        {/* Manifest Item 4 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              Region Changeable
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-500">
            Yes
          </span>
        </div>

        {/* Manifest Item 5 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <Ban className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              No Previous Bans
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-500">
            Clear
          </span>
        </div>

        {/* Manifest Item 6 */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold text-slate-700">
              Peak Rank: Radiant
            </span>
          </div>
          <span className="text-[10px] font-black uppercase text-[#7C3AED]">
            Ep 5 Act 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingAssetManifest;
