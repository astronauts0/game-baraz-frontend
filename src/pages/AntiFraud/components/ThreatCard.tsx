import React from "react";
import { cn } from "@/lib/utils";
import type { ThreatCardProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import RotateBox from "@/components/shared/RotateBox";

type Props = {
  threat: ThreatCardProps;
};

const ThreatCard: React.FC<Props> = ({ threat }) => {
  return (
    <Card>
      <CardContent className="group">
        <div className="flex justify-between items-start mb-8">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
              threat.riskColor,
            )}
          >
            {threat.risk}
          </span>

          <span className="text-[10px] font-mono font transition-colors">
            ID: {threat.id}
          </span>
        </div>

        <h3 className="text-3xl font-display font-black text-slate-900 mb-4 leading-tight transition-transform">
          {threat.title}
        </h3>

        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 min-h-[60px]">
          {threat.description}
        </p>

        <div className="pt-6 border-t border-slate-100">
          <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-4">
            Countermeasure Protocol
          </div>

          <div className="flex items-center gap-4">
            <RotateBox className={`text-white ${threat.accent}`}>
              <threat.icon size={22} />
            </RotateBox>

            <div>
              <div className="text-sm font-bold text-slate-900">
                {threat.protocol}
              </div>
              <div className="text-[10px] font-medium text-slate-400">
                {threat.protocolSub}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatCard;
