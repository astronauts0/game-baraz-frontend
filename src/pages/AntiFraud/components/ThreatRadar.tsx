import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Card, CardContent } from "@/components/ui/card";

const ThreatRadar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Radar Line Animation
      gsap.to(".radar-line", {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "linear",
        transformOrigin: "bottom center",
      });

      // Blips appearing randomly
      const blips = gsap.utils.toArray(".radar-blip");
      blips.forEach((blip: any) => {
        gsap.to(blip, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          repeat: -1,
          repeatDelay: Math.random() * 2 + 1,
          yoyo: true,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Card
      ref={containerRef}
      className="lg:col-span-4 justify-center items-center"
    >
      <CardContent>
        <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-600 font-bold uppercase">
          Scanning Network...
        </div>

        {/* Radar Visual */}
        <div className="w-64 h-64 rounded-full border border-slate-100 bg-slate-50 relative flex items-center justify-center overflow-hidden">
          {/* Grid Rings */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-slate-200"></div>
          <div className="absolute w-[50%] h-[50%] rounded-full border border-slate-200"></div>
          <div className="absolute w-[20%] h-[20%] rounded-full border border-slate-200"></div>

          {/* Crosshairs */}
          <div className="absolute w-full h-px bg-slate-200"></div>
          <div className="absolute h-full w-px bg-slate-200"></div>

          {/* Scanner Line */}
          <div className="radar-line absolute top-0 left-1/2 w-[50%] h-[50%] bg-linear-to-r from-transparent to-emerald-500/10 origin-bottom-left border-r border-emerald-500/30"></div>

          {/* Blips */}
          <div className="radar-blip absolute top-[20%] right-[30%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] opacity-0"></div>
          <div className="radar-blip absolute bottom-[30%] left-[20%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] opacity-0"></div>
          <div className="radar-blip absolute top-[60%] right-[20%] w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_amber] opacity-0"></div>
        </div>

        <div className="mt-8 text-center">
          <div className="text-3xl font-black text-slate-900 mb-1">99.9%</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Threats Neutralized Automatically
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatRadar;
