import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import BackgroundFx from "@/components/shared/BackgroundFx";
import SectionHeader from "@/components/shared/SectionHeader";
import VaultSummary from "@/pages/SafeHouse/components/VaultSummary";
import LiveLedger from "@/pages/SafeHouse/components/LiveLedger";
import SecurityList from "@/pages/SafeHouse/components/SecurityList";
import PreviewCursor from "@/pages/SafeHouse/components/PreviewCursor";

const Safehouse: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Cursor Follower Logic
      const movePreview = (e: MouseEvent) => {
        if (!previewRef.current) return;

        // Calculate relative position within the list container if needed,
        // but fixed position following clientX/Y is smoother for "floating" effect
        gsap.to(previewRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2, // Some lag for smooth feel
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", movePreview);

      return () => {
        window.removeEventListener("mousemove", movePreview);
      };
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveFeature(index);
    gsap.to(".preview-cursor", {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setActiveFeature(null);
    gsap.to(".preview-cursor", {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <ContainerDiv className="py-20">
      <BackgroundFx from="from-emerald-500/23" />
      <SectionHeader
        badge="System Status: Operational"
        badgeDot="bg-emerald-500"
        topText="The Safehouse"
        bottomText="Vault"
        description="Real-time transparency. Every transaction is monitored, secured, and backed 1:1. We don't hide the money; we protect it."
        rollingOptions={{
          bottom: {
            gradient: "word",
          },
        }}
      />

      <div>
        {/* Main Vault Dashboard (refactored into components) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-24">
          <VaultSummary />
          <LiveLedger />
        </div>

        {/* Security list (component) */}
        <SecurityList
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Floating Preview Image - Fixed to viewport, controlled by GSAP (component) */}
      <PreviewCursor ref={previewRef} activeFeature={activeFeature} />
    </ContainerDiv>
  );
};

export default Safehouse;
