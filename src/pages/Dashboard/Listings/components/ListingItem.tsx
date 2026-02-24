import React from "react";
import {
  MoreVertical,
  Eye,
  Edit2,
  PauseCircle,
  CheckCircle,
  Clock,
  Heart,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type DashboardListing } from "@/types";

interface ListingItemProps {
  listing: DashboardListing;
  onNavigateToSell: (
    mode: "create" | "edit" | "view",
    listing?: DashboardListing,
  ) => void;
  onToggleStatus: (id: string) => void;
  onDeleteRequest: (id: string) => void;
}

export const ListingItem: React.FC<ListingItemProps> = ({
  listing,
  onNavigateToSell,
  onToggleStatus,
  onDeleteRequest,
}) => {
  const getStatusBadge = (status: DashboardListing["status"]) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 font-bold"
          >
            <CheckCircle size={14} /> ACTIVE
          </Badge>
        );
      case "Draft":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-600 border-slate-200 gap-1.5 font-bold"
          >
            <Edit2 size={14} /> DRAFT
          </Badge>
        );
      case "Sold":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 gap-1.5 font-bold"
          >
            <CheckCircle size={14} /> SOLD
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200 gap-1.5 font-bold"
          >
            <PauseCircle size={14} /> INACTIVE
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col md:flex-row gap-6 items-center group">
      {/* Image */}
      <div className="w-full md:w-32 h-32 md:h-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase">
          {listing.game}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 w-full text-center md:text-left">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {listing.title}
        </h3>
        <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Clock size={12} /> Created {listing.createdAt}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} /> {listing.views} views
          </span>
          <span className="flex items-center gap-1">
            <Heart size={12} /> {listing.likes} likes
          </span>
        </div>
      </div>

      {/* Status & Price */}
      <div className="flex flex-row md:flex-col items-center gap-3 md:items-end w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 mt-2 md:mt-0">
        {getStatusBadge(listing.status)}
        <p className="text-xl font-bold text-slate-900">
          Rs {listing.price.toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="relative border-l border-slate-100 pl-4 ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-slate-600"
            >
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onNavigateToSell("view", listing)}>
              <Eye size={16} className="mr-2 text-slate-400" /> View Listing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigateToSell("edit", listing)}>
              <Edit2 size={16} className="mr-2 text-slate-400" /> Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(listing.id)}>
              {listing.status === "Active" ? (
                <>
                  <PauseCircle size={16} className="mr-2 text-slate-400" />{" "}
                  Deactivate
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-2 text-slate-400" />{" "}
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={() => onDeleteRequest(listing.id)}
            >
              <Trash2 size={16} className="mr-2" /> Delete Listing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
