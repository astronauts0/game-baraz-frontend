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
            className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 font-bold text-[10px]"
          >
            <CheckCircle size={12} /> ACTIVE
          </Badge>
        );
      case "Draft":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-600 border-slate-200 gap-1.5 font-bold text-[10px]"
          >
            <Edit2 size={12} /> DRAFT
          </Badge>
        );
      case "Sold":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 gap-1.5 font-bold text-[10px]"
          >
            <CheckCircle size={12} /> SOLD
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200 gap-1.5 font-bold text-[10px]"
          >
            <PauseCircle size={12} /> INACTIVE
          </Badge>
        );
      default:
        return <Badge className="text-[10px]">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group overflow-hidden">
      {/* Image Section */}
      <div className="aspect-4/3 w-full overflow-hidden bg-slate-100 relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase">
          {listing.game}
        </div>
        <div className="absolute top-2 right-2">
          {getStatusBadge(listing.status)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 flex-1 mr-2">
            {listing.title}
          </h3>
          <p className="text-sm font-bold text-slate-900 shrink-0">
            Rs {listing.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium mb-4">
          <span className="flex items-center gap-1">
            <Eye size={10} /> {listing.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={10} /> {listing.likes}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={10} /> {listing.createdAt}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-8"
            onClick={() => onNavigateToSell("edit", listing)}
          >
            <Edit2 size={12} className="mr-1" /> Edit
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-slate-400"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onNavigateToSell("view", listing)}
              >
                <Eye size={14} className="mr-2" /> View Listing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(listing.id)}>
                {listing.status === "Active" ? (
                  <>
                    <PauseCircle size={14} className="mr-2" /> Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} className="mr-2" /> Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDeleteRequest(listing.id)}
              >
                <Trash2 size={14} className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
