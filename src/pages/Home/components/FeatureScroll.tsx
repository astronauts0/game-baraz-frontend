import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContainerDiv from "@/components/shared/ContainerDiv";

const FeatureScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create a timeline that is scrubbed by the scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Lock when the section hits the top of the viewport
          end: "+=200%", // Pin for 200% screen height to allow comfortable scrolling speed
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the section in place
        },
      });

      // Animate the keywords revealing from the bottom
      // The wrapper has overflow-hidden. We start the text pushed down (yPercent: 100+)
      // and animate it up to 0.
      tl.from(".feature-keyword", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.15, // Delay between each word appearing
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sm:h-screen h-[90vh] flex flex-col items-center justify-center relative"
    >
      <ContainerDiv
        ref={containerRef}
        className="relative z-10 text-center w-full mt-10"
      >
        {/* Top Headline - Static, always visible once section is in view */}
        <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter">
          WE PROMISE
        </h2>

        {/* Stacked Keywords */}
        <div className="flex flex-col items-center justify-center leading-[0.85]">
          {["NO SCAMS", "NO DRAMA", "REAL", "LOOT"].map((word) => (
            <div key={word} className="overflow-hidden pb-1 px-2">
              <span className="feature-keyword block text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter text-primary origin-center">
                {word}
              </span>
            </div>
          ))}
        </div>
      </ContainerDiv>
    </section>
  );
};

export default FeatureScroll;
