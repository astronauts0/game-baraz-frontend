import React, { useState, useMemo } from "react";
import { ListingsHeader } from "./components/ListingsHeader";
import { ListingsStats } from "./components/ListingsStats";
import { ListingsFilters } from "./components/ListingsFilters";
import { ListingItem } from "./components/ListingItem";
import { DeleteListingDialog } from "./components/DeleteListingDialog";
import { EmptyListingsState } from "./components/EmptyListingsState";
import { type DashboardListing } from "@/types";
import { INITIAL_LISTINGS } from "@/constants";

interface ListingsPageProps {
  listings?: DashboardListing[];
  onNavigateToSell?: (
    mode: "create" | "edit" | "view",
    listing?: DashboardListing,
  ) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

const ListingsPage: React.FC<ListingsPageProps> = ({
  listings = INITIAL_LISTINGS,
  onNavigateToSell = () => {},
  onDelete = () => {},
  onToggleStatus = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Draft" | "Sold"
  >("All");

  // Actions state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter Logic - Memoized for performance
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const lowerSearch = searchQuery.toLowerCase();
      const matchesSearch =
        listing.title.toLowerCase().includes(lowerSearch) ||
        listing.game.toLowerCase().includes(lowerSearch);
      const matchesStatus =
        statusFilter === "All" || listing.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchQuery, statusFilter]);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <ListingsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateNew={() => onNavigateToSell("create")}
      />

      {/* Stats Overview */}
      <ListingsStats />

      {/* Tabs */}
      <ListingsFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Listings List */}
      <div className="space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing}
              onNavigateToSell={onNavigateToSell}
              onToggleStatus={onToggleStatus}
              onDeleteRequest={(id) => setDeleteId(id)}
            />
          ))
        ) : (
          <EmptyListingsState onCreateNew={() => onNavigateToSell("create")} />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteListingDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
};

export default ListingsPage;
