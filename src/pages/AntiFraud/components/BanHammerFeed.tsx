import React, { useState, useEffect } from "react";
import { Gavel, ShieldAlert } from "lucide-react";
import { bannedUsersData } from "@/data/appData";
import { Card, CardContent } from "@/components/ui/card";
import ComingSoonOverlay from "@/components/shared/ComingSoonOverlay";

const BanHammerFeed: React.FC = () => {
  const [bannedUsers, setBannedUsers] = useState(bannedUsersData);

  // Simulate adding bans to live feed
  useEffect(() => {
    const interval = setInterval(() => {
      const reasons = [
        "Recall Attempt",
        "Fake ID",
        "Suspicious Login",
        "Chat Abuse",
        "VPN evasion",
      ];
      const users = ["Scam", "User", "Bot", "Agent"];
      const newUser = {
        user: `${users[Math.floor(Math.random() * users.length)]}_${Math.floor(Math.random() * 999)}`,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        time: "Just now",
      };
      setBannedUsers((prev) => [newUser, ...prev.slice(0, 3)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="lg:col-span-4 overflow-y-auto h-105 scrollbar-hide">
      <CardContent>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 shadow-sm border border-red-100">
              <Gavel size={20} />
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-sm uppercase">
                The Ban Hammer
              </h3>
              <p className="text-[10px] font-bold text-red-400 uppercase">
                Live Enforcement Feed
              </p>
            </div>
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>

        <div className="space-y-3 relative">
          <ComingSoonOverlay
            message="Coming Soon"
            subtitle="Live transaction feed enabled shortly."
          />
          {bannedUsers.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-red-100 animate-in slide-in-from-right fade-in duration-300 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <ShieldAlert size={14} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700">
                    {item.user}
                  </div>
                  <div className="text-[10px] font-medium text-red-500">
                    {item.reason}
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BanHammerFeed;
