import React from "react";
import { threats } from "@/data/appData";
import ThreatCard from "./ThreatCard";

const KnownThreats: React.FC = () => {
  return (
    <div className="relative">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-black text-slate-900 mb-2">
          Known Threats
        </h2>

        <p className="text-slate-500 text-sm font-bold font-mono uppercase tracking-widest">
          Signature Database // V4.2
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {threats.map((threat) => (
          <ThreatCard key={threat.id} threat={threat} />
        ))}
      </div>
    </div>
  );
};

export default KnownThreats;
