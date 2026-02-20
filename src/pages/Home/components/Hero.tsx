import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { floatingImages, imagePositions } from "@/data/appData";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionHeader from "@/components/shared/SectionHeader";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade-in for other elements
      gsap.from(".fade-in", {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 2.2,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Floating Images Animation
      const floaters = containerRef.current?.querySelectorAll(".hero-floater");
      if (floaters) {
        floaters.forEach((el, i) => {
          // Random float movement
          gsap.to(el, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-10, 10)",
            duration: "random(4, 7)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });

          // Initial entrance
          gsap.from(el, {
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.75)",
            delay: 0.5 + i * 0.2,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ContainerDiv
      ref={containerRef}
      className="relative min-h-screen h-full flex items-center justify-center overflow-hidden w-full"
    >
      {/* Floating Background Images */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {floatingImages.map((src, idx) => (
          <div
            key={idx}
            className="hero-floater absolute pointer-events-auto"
            style={imagePositions[idx % imagePositions.length]}
          >
            <img
              src={src}
              alt="Floating game asset"
              className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-3xl opacity-20 blur-[2px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Abstract Controller Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <img
          alt="Abstract Controller Silhouette"
          className="w-[800px] transform -rotate-12 scale-150 invert grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEOe979Rc61SZY_kO-XDXuuTvx1z_pxaQyV4h9o8u2CqC76TmU5K0h98SPvSKZS_9H0zGA3Hb4OSf93pN28uyykHNOhFWzutEl2t5db-cPnw48cwv95pVhmGFPPtwIZ6cKpTslzvwD5VQODF4SZoyfw5LTFf4DDWDkgYBI7C3DoVHhoQLi59fSGEUuAUwX0Nvp0VIhM7k0v1s2uuGFhD0ii0i_IfCfyr3Jy4ureXB34_7UVFpOqizLHg5WiVt-CUDxM4lSrRI47nU"
        />
      </div>

      <div>
        <SectionHeader
          badge="Zero-Scam Tolerance Policy"
          badgeDot="bg-primary"
          topText="Buy Accounts Without"
          bottomText="The Drama"
          gradientPrimary
          description="Stop getting scammed on Discord by 'xX_Shadow_Xx'. We hold the money
        until you actually get the login. Simple."
          rollingOptions={{
            bottom: {
              gradient: "text",
            },
          }}
          className="md:mb-6 mb-3"
        />

        <div className="fade-in flex items-center justify-center gap-4">
          <Link to="/signup">
            <Button size={"lg"}>
              <span>Get Stacked</span>
              <ArrowRight />
            </Button>
          </Link>
          <Link to="/about">
            <Button size={"lg"} variant="outline">
              How we prevent fraud
            </Button>
          </Link>
        </div>

        {/* Games Ticker */}
        <div className="fade-in sm:mt-20 mt-10 mb-10 sm:mb-0 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 select-none pointer-events-none">
          {["VALORANT", "FORTNITE", "GENSHIN", "CS:GO", "WARZONE"].map(
            (game) => (
              <span
                key={game}
                className=" font-black text-2xl tracking-tighter italic"
              >
                {game}
              </span>
            ),
          )}
        </div>
      </div>
    </ContainerDiv>
  );
};

export default Hero;
