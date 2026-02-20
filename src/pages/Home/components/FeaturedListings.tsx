import { featuredListings } from "@/data/appData";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ListingCard from "@/components/shared/ListingCard";
import type { Listing } from "@/types";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { Button } from "@/components/ui/button";

const FeaturedListings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="marketplace" className="sm:py-24 pb-10 relative overflow-hidden">
      <ContainerDiv>
        <div className="flex items-center justify-between mb-16">
          <div className="space-y-2 md:space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-bold">Fresh Loot</h2>
            <p className="text-slate-500">
              Hand-picked accounts. No bans, no recalls, just pure OP status.
            </p>
            <Link to="/marketplace" className="flex md:hidden justify-center">
              <Button size={"lg"}>
                <span>Browse all stash</span>
                <ArrowRightIcon />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link
              to="/marketplace"
              className="link_right items-center space-x-2 text-primary font-bold transition-all"
            >
              <span>Browse all stash</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="grid_auto_fit">
          {featuredListings.map((item) => {
            // Mapping FeaturedListing to Listing interface
            const mappedItem: Listing = {
              id: item.id,
              title: item.title,
              game: "Game Asset", // Default for home page data
              seller: item.seller,
              sellerTier:
                item.sellerStatus === "INSTANT"
                  ? "VERIFIED"
                  : item.sellerStatus,
              sellerStats: {
                rating: 5.0,
                reviews: 120,
                sold: 450,
                trust: 100,
              }, // Defaults for home page data
              price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
              image: item.image,
              description: "",
              badges: item.badges.map((b) => b.text),
              stats: item.stats,
              deliveryTime:
                item.sellerStatus === "INSTANT" ? "Instant" : "2 Hours",
              aspectRatio: "square",
            };

            return (
              <div key={item.id}>
                <ListingCard
                  data={mappedItem}
                  onClick={() => navigate(`/listing/${item.id}`)}
                />
              </div>
            );
          })}
        </div>
      </ContainerDiv>
    </section>
  );
};

export default FeaturedListings;
