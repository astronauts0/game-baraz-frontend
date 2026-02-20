import { securityFeatures } from "@/data/appData";
import React from "react";

type Props = {
  activeFeature: number | null;
};

const PreviewCursor = React.forwardRef<HTMLDivElement, Props>(
  ({ activeFeature }, ref) => {
    return (
      <div
        ref={ref}
        className="preview-cursor fixed top-0 left-0 w-[300px] h-[200px] rounded-2xl overflow-hidden pointer-events-none z-50 opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 shadow-2xl border-2 border-white/20 hidden lg:flex lg:flex-col lg:items-center lg:justify-center bg-white/80 backdrop-blur-md"
        style={{ transformOrigin: "center center" }}
      >
        {securityFeatures.map((feature, idx) => (
          <img
            key={idx}
            src={feature.image}
            alt="Preview"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              activeFeature === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-2">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Preview
          </p>
          <p className="text-xs text-slate-500 font-medium">Coming Soon</p>
        </div>
      </div>
    );
  },
);

export default PreviewCursor;
