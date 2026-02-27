import React from "react";
import { AlertCircle, ShieldCheck, Star } from "lucide-react";
import { getGameIcon } from "./utils";
import { Card, CardContent } from "@/components/ui/card";
import AlertPrimary from "@/components/shared/Alert/AlertPrimary";

interface LivePreviewProps {
  title: string;
  selectedGame: string;
  image?: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  title,
  selectedGame,
  image,
}) => {
  return (
    <div className="sticky top-28 space-y-4">
      <h3 className="font-bold uppercase">Live Preview</h3>
      <Card className="p-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48 bg-slate-100">
            <img
              src={
                image ||
                `https://picsum.photos/seed/${title || "default"}/400/300`
              }
              alt="Asset Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
              {getGameIcon(selectedGame)}
              <span className="text-xs font-bold text-white">
                {selectedGame}
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg leading-tight line-clamp-2">
                {title || "Your Asset Title"}
              </h4>
            </div>

            <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="relative shrink-0">
                <img
                  src="https://picsum.photos/100/100"
                  alt="Seller"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div
                  className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5 border-2 border-white"
                  title="Verified Operative"
                >
                  <ShieldCheck size={10} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold truncate">Agent Phoenix</p>
                  <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20">
                    Lvl 5
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                    <Star size={10} fill="currentColor" />
                    <span>4.9</span>
                  </div>
                  <span className="text-[10px] text-slate-400">152 Sales</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AlertPrimary
        title="Operative Protection"
        icon={<ShieldCheck className="text-blue-500" />}
        className="border-blue-primary/50 bg-blue-50"
      >
        All transactions are held in escrow until asset delivery is confirmed...
      </AlertPrimary>
      <AlertPrimary
        title="Seller Guidelines"
        icon={<AlertCircle className="text-amber-500" />}
        className="border-amber-300 bg-amber-50"
        titleClassName="text-amber-800"
      >
        <div>
          <ul className="text-xs text-amber-800 space-y-1 list-disc pl-3">
            <li>Ensure screenshots are clear and recent.</li>
            <li>Hide sensitive personal info.</li>
            <li>Deliver assets within 24hrs of sale.</li>
          </ul>
        </div>
      </AlertPrimary>
    </div>
  );
};

export default LivePreview;
