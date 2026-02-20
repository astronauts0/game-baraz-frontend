import React, { useRef } from "react";
import gsap from "gsap";
import { steps } from "../../../data/appData";
import { useGSAP } from "@gsap/react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { SectionBadge } from "@/components/shared/SectionBadge";

const PlanningBoard: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !maskPathRef.current) return;

    const ctx = gsap.context(() => {
      const path = maskPathRef.current;
      if (!path) return;

      // Get the total length of the path
      const length = path.getTotalLength();

      // Set initial state: strokeDasharray is the full length, offset is full length (hidden)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate the offset to 0 to "draw" the line
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // Start drawing when section hits center of viewport
          end: "bottom center", // Finish drawing when bottom hits center
          scrub: 1, // Smoothly scrub the animation with scroll
        },
      });

      // Optional: Stagger reveal the cards as the line passes them
      gsap.from(".planning-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="sm:py-24 py-10 relative border-y border-slate-200 overflow-hidden"
    >
      <ContainerDiv>
        <div className="text-center sm:mb-20 mb-10 relative z-10 space-y-2">
          <SectionBadge>Intel_Log: The_Heist_Plan</SectionBadge>
          <h2 className="text-4xl font-bold">How We Prevent Fraud</h2>
        </div>

        <div className="relative">
          {/* SVG Dashed Line Animation */}
          {/* We use a viewBox to ensure the path scales correctly across screen sizes */}
          <svg
            className="absolute top-[20%] left-0 w-full h-[60%] pointer-events-none z-0 hidden md:block"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="dashedLineMask">
                {/* This path is solid white and animates to reveal the content beneath */}
                <path
                  ref={maskPathRef}
                  d="M 50 100 Q 300 180 500 100 T 950 100"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                />
              </mask>
            </defs>

            {/* 
              This is the visible dashed line. 
              It is masked by the animating path above.
              When the mask path is "drawn", this dashed line becomes visible.
            */}
            <path
              d="M 50 100 Q 300 180 500 100 T 950 100"
              fill="none"
              stroke="#94A3B8"
              strokeDasharray="12 8"
              strokeWidth="3"
              mask="url(#dashedLineMask)"
              className="opacity-60"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`planning-card relative group ${idx % 2 !== 0 ? "mt-8 md:mt-16" : ""} ${idx === 3 ? "md:mt-12" : ""}`}
              >
                <div
                  className={`absolute -top-3 -left-3 heist-marker ${step.markerColor.includes("shadow") ? step.markerColor : "bg-red-500 shadow-red-500/50"}`}
                ></div>

                <div
                  className={`bg-white p-6 rounded-2xl shadow-xl transform ${step.rotation} group-hover:rotate-0 transition-all duration-300 border border-slate-200 h-full flex flex-col ${step.shadowColor !== "shadow-none" ? `ring-1 ring-primary/5 ${step.shadowColor}` : ""}`}
                >
                  <div className="text-4xl font-black text-slate-300 mb-4 select-none">
                    {step.id}
                  </div>
                  <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 grow font-medium">
                    {step.description}
                  </p>
                  <div className="pt-4 border-t border-slate-200 text-[10px] font-mono text-slate-600 italic">
                    LOG: {step.log}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContainerDiv>
    </section>
  );
};

export default PlanningBoard;
