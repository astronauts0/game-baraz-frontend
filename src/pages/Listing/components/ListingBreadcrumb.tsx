import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ListingBreadcrumbProps {
  game: string;
  id: string | number;
}

const ListingBreadcrumb: React.FC<ListingBreadcrumbProps> = ({ game, id }) => {
  return (
    <div className="w-full border-b border-slate-200 anim-header mb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Link
            to="/marketplace"
            className="hover:text-primary transition-colors flex items-center gap-1 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO MARKETPLACE
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600">{game}</span>
          <span className="text-slate-300">/</span>
          <span>ASSET_ID: {id.toString().padStart(3, "0")}</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-50 border border-emerald-200 text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            Escrow Protected
          </Badge>
          <Badge className="bg-primary/10 text-primary border border-primary/40">
            <Zap className="w-3.5 h-3.5" />
            Rare Drop
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ListingBreadcrumb;
