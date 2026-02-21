import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface ListingBreadcrumbProps {
  game: string;
  id: string | number;
}

const ListingBreadcrumb: React.FC<ListingBreadcrumbProps> = ({ game, id }) => {
  return (
    <div className="w-full anim-header">
      <div className="h-12 flex items-center flex-wrap justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest gap-4">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/marketplace"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  BACK TO MARKETPLACE
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {game}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                ASSET_ID: {id.toString().padStart(3, "0")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
