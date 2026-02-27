import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ListingsStats } from "./components/ListingsStats";
import { ListingsFilters } from "./components/ListingsFilters";
import { ListingItem } from "./components/ListingItem";
import { EmptyListingsState } from "./components/EmptyListingsState";
import { type DashboardListing } from "@/types";
import { INITIAL_LISTINGS } from "@/constants";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionTop from "@/components/global/SectionTop";
import SearchPrimary from "@/components/shared/Form/SearchPrimary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AlertDialogPrimary from "@/components/shared/Alert/AlertDialogPrimary";

const ListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] =
    useState<DashboardListing[]>(INITIAL_LISTINGS);
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
      setListings((prev) => prev.filter((listing) => listing.id !== deleteId));
      setDeleteId(null);
    }
  };

  const onNavigateToSell = (
    mode: "create" | "edit" | "view",
    listing?: DashboardListing,
  ) => {
    if (mode === "create") {
      navigate("/dashboard/sell");
    } else if (listing) {
      navigate(`/dashboard/sell/${mode}/${listing.id}`);
    }
  };

  const onToggleStatus = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? {
              ...listing,
              status: listing.status === "Active" ? "Inactive" : "Active",
            }
          : listing,
      ),
    );
  };

  return (
    <ContainerDiv className="py-10 md:py-20 space-y-6">
      {/* Header */}

      <SectionTop
        title="My Listings"
        description="Manage your active assets, drafts, and inventory history."
      >
        <SearchPrimary
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search listings..."
          className="w-fit lg:w-80"
        />

        <Button onClick={() => onNavigateToSell("create")} size={"lg"}>
          <Plus size={18} />{" "}
          <span className="hidden sm:inline">Create New</span>
        </Button>
      </SectionTop>

      {/* Stats Overview */}
      <ListingsStats listings={listings} />

      {/* Tabs */}
      <ListingsFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Listings List */}
      <div className="grid_auto_fit">
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
          <div className="col-span-full">
            <EmptyListingsState />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}

      <AlertDialogPrimary
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        description="This action cannot be undone and will permanently remove this listing."
        confirmText="Delete Permanently"
        variant="error"
      />
    </ContainerDiv>
  );
};

export default ListingsPage;
