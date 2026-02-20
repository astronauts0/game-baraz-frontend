import React, { useRef } from "react";
import gsap from "gsap";
import { challenges, solutions } from "@/data/appData";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ContainerDiv from "@/components/shared/ContainerDiv";

const ChallengesSolutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);
  const circlePathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Helper function to animate SVG path drawing
      const animatePath = (
        path: SVGPathElement,
        triggerElement: Element | string,
      ) => {
        const length = path.getTotalLength();
        // Reset to hidden state
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerElement,
            start: "top 75%", // Start animation when element hits 75% down viewport
            toggleActions: "play none none reverse",
          },
        });
      };

      if (underlinePathRef.current) {
        animatePath(underlinePathRef.current, ".challenges-header");
      }

      if (circlePathRef.current) {
        animatePath(circlePathRef.current, ".solutions-header");
      }

      // Animate List Items (Challenges)
      gsap.from(".challenge-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".challenges-col",
          start: "top 70%",
        },
      });

      // Animate List Items (Solutions)
      gsap.from(".solution-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3, // Slight delay after challenges start
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".solutions-col",
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sm:py-32 py-10 bg-white relative overflow-hidden">
      <ContainerDiv className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 relative max-w-7xl mx-auto">
          {/* Center Divider (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2 rounded-full"></div>

          {/* Challenges Column */}
          <div className="md:pl-5 lg:pr-20 challenges-col">
            <div className="relative mb-16 text-center challenges-header">
              <h3 className="text-3xl font-medium lg:text-5xl relative inline-block z-10 pb-2">
                The "Discord" Way
                {/* Hand-drawn Underline SVG */}
                <svg
                  className="absolute -bottom-3 left-0 w-full h-auto"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    ref={underlinePathRef}
                    d="M2.00026 6.99997C52.825 2.15286 128.022 -3.7634 197.974 6.99997"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </h3>
            </div>
            <div className="space-y-5 lg:space-y-10">
              {challenges.map((item, idx) => (
                <div key={idx} className="challenge-item flex gap-2 md:gap-6">
                  <span className="shrink-0 text-2xl text-red-500 mt-1">
                    <X />
                  </span>
                  <p className="text-slate-600 font-medium sm:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="md:pl-5 lg:pl-20 solutions-col">
            <div className="relative mb-16 text-center solutions-header">
              <h3 className="text-3xl lg:text-5xl relative font-medium inline-block z-10 px-6 py-2">
                GameBazaar Way
                {/* Hand-drawn Circle SVG */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 scale-120"
                  viewBox="0 0 200 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    ref={circlePathRef}
                    d="M190.461 31.8624C187.523 18.0673 166.703 6.64333 135.539 3.10996C103.018 -0.578641 60.5936 2.08316 32.7487 11.5365C10.7495 19.0044 1.34863 32.7937 8.52841 46.8532C13.5658 56.7161 30.6547 65.176 54.3822 70.817C82.5273 77.5082 122.95 78.8959 154.276 72.8228C176.657 68.4849 194.272 59.8824 198.396 48.6562"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </h3>
            </div>
            <div className="space-y-5 lg:space-y-10">
              {solutions.map((item, idx) => (
                <div
                  key={idx}
                  className="solution-item flex items-start gap-2 md:gap-6"
                >
                  <span className="shrink-0 text-2xl text-emerald-500 mt-1">
                    <Check />
                  </span>
                  <p className="text-slate-600 font-medium sm:text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sm:mt-24 mt-10 flex flex-col md:flex-row items-center justify-center md:gap-8 gap-4">
          <Link to="/signup">
            <Button size={"lg"}>
              <span>Get an account safely</span>
              <ArrowRight />
            </Button>
          </Link>
          <div className="font-bold text-base cursor-default border-b border-slate-300 hover hover:border-slate-900 transition-all pb-0.5 link_right">
            Or keep risking it (don't)
          </div>
        </div>
      </ContainerDiv>
    </section>
  );
};

export default ChallengesSolutions;
