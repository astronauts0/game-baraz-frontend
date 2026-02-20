import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import ComingSoonOverlay from "@/components/shared/ComingSoonOverlay";

const VaultSummary: React.FC = () => {
  const [balance, setBalance] = useState(14250000); // Start at 14.25M

  // Simulate live ticker for balance
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add small amounts to simulate live transactions
      setBalance((prev) => prev + Math.floor(Math.random() * 500));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:col-span-7 vault-card glass_box p-5 md:p-10 relative overflow-hidden">
      <ComingSoonOverlay
        message="Coming Soon"
        subtitle="Live transaction feed enabled shortly."
        className="sm:hidden"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-primary">
            <Lock size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Total Value Secured
          </span>
        </div>
        {/* Balance section with partial blur */}
        <div className="relative w-fit">
          <div className="text-4xl sm:text-5xl md:text-7xl font-mono font-black tracking-tighter mb-8">
            ${balance.toLocaleString()}
          </div>
          {/* Uncomment to blur only the balance: */}
          <ComingSoonOverlay variant="fit" badgeText="coming soon...." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-bold uppercase mb-1">
              Active Escrows
            </div>
            <div className="sm:text-2xl font-bold text-emerald-500 relative">
              <ComingSoonOverlay
                badgeDotClass="bg-emerald-500"
                variant="fit"
                badgeText="coming soon...."
              />
              1,248
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-[10px] font-bold uppercase mb-1">
              Payouts (24h)
            </div>
            <div className="sm:text-2xl font-bold text-indigo-500 relative">
              <ComingSoonOverlay variant="fit" badgeText="coming soon...." />
              $342k
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultSummary;
