import React from "react";
import SearchPrimary from "@/components/shared/Form/SearchPrimary";

interface HelpHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HelpHero: React.FC<HelpHeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="text-center space-y-6 py-8">
      <h1 className="text-4xl font-bold tracking-tight">
        How can we help you, Operative?
      </h1>
      <p className="text-slate-500 max-w-2xl mx-auto text-lg">
        Search our knowledge base for answers regarding secure trading, account
        management, and marketplace protocols.
      </p>

      <div className="relative max-w-xl mx-auto flex items-center">
        <SearchPrimary
          className="w-full"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for articles, errors, or keywords..."
        />
      </div>
    </div>
  );
};

export default HelpHero;
