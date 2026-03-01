import React, { useState } from "react";
import HelpHero from "./components/HelpHero";
import HelpCategories from "./components/HelpCategories";
import HelpFAQ from "./components/HelpFAQ";
import HelpContact from "./components/HelpContact";
import ContainerDiv from "@/components/shared/ContainerDiv";

interface HelpCenterPageProps {
  onContactSupport?: () => void;
}

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({
  onContactSupport,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ContainerDiv className="py-10 sm:py-20 space-y-6">
      <HelpHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <HelpCategories searchQuery={searchQuery} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <HelpFAQ searchQuery={searchQuery} />
        <HelpContact onContactSupport={onContactSupport} />
      </div>
    </ContainerDiv>
  );
};

export default HelpCenterPage;
