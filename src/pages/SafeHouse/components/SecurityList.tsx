import React from "react";
import { Shield } from "lucide-react";
import { securityFeatures } from "@/data/appData";
import ComingSoonOverlay from "@/components/shared/ComingSoonOverlay";

type Props = {
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
};

const SecurityList: React.FC<Props> = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <div className="security-list-container relative border-t border-slate-200 pt-8 md:pt-16">
      <ComingSoonOverlay
        message="Coming Soon"
        subtitle={
          <>
            We are <mark>collecting and verifying information</mark> to provide
            you with the most accurate and up-to-date insights. Stay tuned for
            updates!
          </>
        }
      />

      <div className="mb-12">
        <h2 className="text-3xl font-display font-black text-slate-900 mb-2">
          Security Protocols
        </h2>
        <p className="text-slate-500 text-sm font-bold font-mono uppercase tracking-widest">
          Active Measures // Level 5
        </p>
      </div>

      <div className="space-y-0">
        {securityFeatures.map((item, idx) => (
          <div
            key={idx}
            className="security-row group relative border-t border-slate-100 py-10 transition-all hover:bg-slate-50/50 cursor-default"
            onMouseEnter={() => onMouseEnter(idx)}
            onMouseLeave={onMouseLeave}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 relative z-10 px-4 md:px-0">
              <div className="w-full md:w-32 shrink-0 pt-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                  {item.version}
                </div>
              </div>

              <div className="w-full md:w-1/4 shrink-0">
                <h3 className="flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-slate-900 leading-tight group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-slate-400">
                    <Shield size={18} />
                  </span>
                  {item.title}
                </h3>
              </div>

              <div className="flex-1">
                <p className="text-slate-500 font-medium leading-relaxed max-w-lg group-hover:text-slate-700 transition-colors">
                  {item.description}
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0 pt-1">
                <button className="px-6 py-3 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-900 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm">
                  {item.action}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-slate-100"></div>
      </div>
    </div>
  );
};

export default SecurityList;
