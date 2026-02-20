import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockListings } from "../../data/mockData";
import type { Listing } from "../../types";
import ListingCard from "../../components/shared/ListingCard";
import MarketplaceFilterBar from "./components/MarketplaceFilterBar";
import MarketplaceContentHeader from "./components/MarketplaceContentHeader";
import ListingRow from "./components/ListingRow";
import SectionHeader from "@/components/shared/SectionHeader";
import ContainerDiv from "@/components/shared/ContainerDiv";
import BackgroundFx from "@/components/shared/BackgroundFx";
import { SearchX } from "lucide-react";
import RotateBox from "@/components/shared/RotateBox";
import { Button } from "@/components/ui/button";
import { GAMES, getGridClass } from "@/constants";

const Marketplace: React.FC = () => {
  const [activeGame, setActiveGame] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridColumns, setGridColumns] = useState<number>(4);
  const navigate = useNavigate();

  const filteredListings = useMemo(() => {
    return mockListings.filter((l) => {
      const matchesGame = activeGame === "All" || l.game === activeGame;
      const matchesSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.game.toLowerCase().includes(search.toLowerCase());
      return matchesGame && matchesSearch;
    });
  }, [activeGame, search]);

  const handleListingClick = (listing: Listing) =>
    navigate(`/listing/${listing.id}`);

  return (
    <ContainerDiv className="py-20">
      <BackgroundFx from="from-slate-500/50" />
      <SectionHeader
        badge="Secure Archive Access"
        badgeDot="bg-slate-500"
        topText="The Global"
        bottomText="Archive"
        description="Curated access to premium digital assets. Verified by intelligence, secured by protocol. Browse the collection below."
        rollingOptions={{
          bottom: {
            gradient: "word",
          },
        }}
      />

      <MarketplaceFilterBar
        search={search}
        onSearchChange={setSearch}
        activeGame={activeGame}
        games={GAMES}
        onGameChange={setActiveGame}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        onSearchSubmit={() => setSearch((s) => s.trim())}
      />

      <MarketplaceContentHeader
        count={filteredListings.length}
        viewMode={viewMode}
        gridColumns={gridColumns}
        onViewModeChange={setViewMode}
        onGridColumnsChange={setGridColumns}
      />

      <div>
        {filteredListings.length > 0 ? (
          viewMode === "grid" ? (
            <div className={`grid ${getGridClass(gridColumns)} gap-6`}>
              {filteredListings.map((item) => (
                <div key={item.id} className="listing-item h-full">
                  <ListingCard data={item} onClick={handleListingClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-5xl mx-auto flex flex-col">
              {filteredListings.map((item) => (
                <div key={item.id} className="listing-item">
                  <ListingRow data={item} onClick={handleListingClick} />
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="flex flex-col gap-2 items-center justify-center py-32 text-center">
            <RotateBox className="rounded-full size-20!">
              <SearchX size={40} />
            </RotateBox>
            <h3 className="text-xl font-bold">No Loot Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">
              Adjust your filters or try searching for something else.
            </p>
            <Button
              onClick={() => {
                setActiveGame("All");
                setSearch("");
              }}
              className="cursor-copy"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </ContainerDiv>
  );
};

export default Marketplace;
