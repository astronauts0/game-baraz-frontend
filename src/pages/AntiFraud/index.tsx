import React from "react";
import ThreatRadar from "./components/ThreatRadar";
import BanHammerFeed from "./components/BanHammerFeed";
import ReportCTA from "./components/ReportCTA";
import KnownThreats from "./components/KnownThreats";
import ContainerDiv from "@/components/shared/ContainerDiv";
import BackgroundFx from "@/components/shared/BackgroundFx";
import SectionHeader from "@/components/shared/SectionHeader";

const AntiFraud: React.FC = () => {
  return (
    <ContainerDiv className="py-20">
      <BackgroundFx from="from-red-500/15" />
      <SectionHeader
        badge="Active Threat Monitoring"
        badgeDot="bg-red-500"
        topText="Zero Tolerance."
        bottomText="Anti-Fraud"
        description="We don't just ban scammers; we map their networks, fingerprint their devices, and nuke their accounts. Fraud is not a business model here."
        rollingOptions={{
          bottom: {
            gradient: "word",
          },
        }}
      />

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-24">
          {/* Threat Detection Radar */}
          <ThreatRadar />

          {/* Live Ban Hammer Feed */}
          <BanHammerFeed />

          {/* Reporting CTA */}
          <ReportCTA />
        </div>

        {/* Common Scams Section */}
        <KnownThreats />
      </div>
    </ContainerDiv>
  );
};

export default AntiFraud;
