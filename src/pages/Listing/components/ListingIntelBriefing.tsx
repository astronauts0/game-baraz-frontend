import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ListingIntelBriefingProps {
  description: string;
}

const ListingIntelBriefing: React.FC<ListingIntelBriefingProps> = ({
  description,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
              Intel Briefing
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Comprehensive asset evaluation report
            </p>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium mb-8">
          {description} <br />
          <br />
          Currently ranked in the top 0.1% of players globally. Tactical
          positioning and win-rate metrics are significantly above average,
          making this an elite competitive asset for professional use.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Skins
            </div>
            <div className="text-lg font-black text-slate-900">142 Total</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Win Rate
            </div>
            <div className="text-lg font-black text-emerald-500">68%</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Level
            </div>
            <div className="text-lg font-black text-slate-900">245</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              Security
            </div>
            <div className="text-lg font-black text-[#7C3AED]">ELITE</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingIntelBriefing;
