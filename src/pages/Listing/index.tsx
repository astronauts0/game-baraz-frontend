import React, { useRef, useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockListings } from "../../data/mockData";

// Shared Components
import ContainerDiv from "@/components/shared/ContainerDiv";
import BackgroundFx from "@/components/shared/BackgroundFx";

// Page Components
import ListingBreadcrumb from "./components/ListingBreadcrumb";
import ListingHero from "./components/ListingHero";
import ListingIntelBriefing from "./components/ListingIntelBriefing";
import ListingAssetManifest from "./components/ListingAssetManifest";
import ListingAcquisitionCard from "./components/ListingAcquisitionCard";
import ListingAgentProfile from "./components/ListingAgentProfile";
import ListingReviews from "./components/ListingReviews";

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find listing from mock data
  const listing = useMemo(() => {
    return mockListings.find((l) => l.id === Number(id));
  }, [id]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Simulate gathering multiple images for the slider
  useEffect(() => {
    if (!listing) return;

    const images = [listing.image];
    // Add generic images based on game type to simulate a full gallery
    if (listing.game.includes("Valorant")) {
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
      );
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBEOe979Rc61SZY_kO-XDXuuTvx1z_pxaQyV4h9o8u2CqC76TmU5K0h98SPvSKZS_9H0zGA3Hb4OSf93pN28uyykHNOhFWzutEl2t5db-cPnw48cwv95pVhmGFPPtwIZ6cKpTslzvwD5VQODF4SZoyfw5LTFf4DDWDkgYBI7C3DoVHhoQLi59fSGEUuAUwX0Nvp0VIhM7k0v1s2uuGFhD0ii0i_IfCfyr3Jy4ureXB34_7UVFpOqizLHg5WiVt-CUDxM4lSrRI47nU",
      );
    } else if (listing.game.includes("Fortnite")) {
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBEOe979Rc61SZY_kO-XDXuuTvx1z_pxaQyV4h9o8u2CqC76TmU5K0h98SPvSKZS_9H0zGA3Hb4OSf93pN28uyykHNOhFWzutEl2t5db-cPnw48cwv95pVhmGFPPtwIZ6cKpTslzvwD5VQODF4SZoyfw5LTFf4DDWDkgYBI7C3DoVHhoQLi59fSGEUuAUwX0Nvp0VIhM7k0v1s2uuGFhD0ii0i_IfCfyr3Jy4ureXB34_7UVFpOqizLHg5WiVt-CUDxM4lSrRI47nU",
      );
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
      );
    } else {
      // Fallback generics
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
      );
      images.push(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
      );
    }
    setGalleryImages(images);
  }, [listing]);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Listing Not Found
          </h2>
          <button
            onClick={() => navigate("/marketplace")}
            className="mt-4 text-primary font-bold"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <ContainerDiv className="py-20">
      <BackgroundFx from="from-primary/20" />

      {/* Top Navigation Bar / Breadcrumb */}
      <ListingBreadcrumb game={listing.game} id={listing.id} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visuals & Briefing */}
          <div className="lg:col-span-8 space-y-8">
            <ListingHero title={listing.title} galleryImages={galleryImages} />
            <ListingIntelBriefing description={listing.description} />
            <ListingAssetManifest />
          </div>

          {/* Right Column: Acquisition & Agent */}
          <div className="lg:col-span-4 space-y-6">
            <ListingAcquisitionCard id={listing.id} price={listing.price} />
            <ListingAgentProfile
              seller={listing.seller}
              sellerTier={listing.sellerTier}
            />
          </div>
        </div>

        {/* Advanced Seller Reviews Section (Now Full Width Below Grid) */}
        <ListingReviews />
      </div>
    </ContainerDiv>
  );
};

export default ListingDetails;
