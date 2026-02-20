import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface RollingTextProps {
  text: string;
  className?: string; // Container class
  charClassName?: string; // Character styling
  cursor?: boolean; // Whether to use the thicker cursor style (Hero uses 0.25em, others 0.3em)
  padding?: boolean; // Whether to add extra padding to chars (Hero uses px-[0.02em])
  animationType?: "slide" | "spin";
  stagger?: number;
  duration?: number;
  delay?: number;
  gradient?: "word" | "text" | "none";
}

const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = "",
  charClassName = "",
  cursor = false,
  padding = false,
  animationType = "slide",
  stagger = 0.04,
  duration = 1.5,
  delay = 0,
  gradient = "none",
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll(".rolling-char");
      if (!chars || chars.length === 0) return;

      const tl = gsap.timeline({
        delay: delay,
        defaults: { ease: "power4.inOut" },
      });

      if (animationType === "spin") {
        // Hero-style spinner animation
        // In Hero:
        // 1. Create a timeline that spins the chars 8 times
        // 2. Tween the progress of that timeline from 0 to 1 over 2.5s

        const spinTl = gsap.timeline({ paused: true });

        chars.forEach((char, i) => {
          const parts = char.querySelectorAll(".char-part");
          const original = parts[0];
          const clone = parts[1];
          const isEven = i % 2 === 0;

          gsap.set(clone, { yPercent: isEven ? -100 : 100 });
          gsap.set(original, { yPercent: 0 });

          // Spin 8 times
          spinTl.add(
            gsap.to([original, clone], {
              yPercent: isEven ? "+=100" : "-=100",
              duration: 1, // base duration for one spin cycle (irrelevant as we tween progress)
              ease: "none",
              repeat: 8,
            }),
            0,
          );
        });

        // Animate the spinner timeline's progress
        tl.to(spinTl, {
          progress: 1,
          duration: duration || 2.5,
          ease: "power4.inOut",
        });
      } else {
        // Standard slide animation (AntiFraud, HowItWorks, Safehouse)
        chars.forEach((char, i) => {
          const parts = char.querySelectorAll(".char-part");
          const original = parts[0];
          const clone = parts[1];
          const isEven = i % 2 === 0;

          gsap.set(clone, { yPercent: isEven ? -100 : 100 });
          gsap.set(original, { yPercent: 0 });

          tl.to(
            [original, clone],
            {
              yPercent: isEven ? "+=100" : "-=100",
              duration: duration,
            },
            i * stagger,
          );
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [text, animationType, stagger, duration, delay],
    },
  );

  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const wordLength = word.length;
        const wordSpans = word.split("").map((char, charIndex) => {
          const charIdx =
            gradient === "text" ? globalCharIndex + charIndex : charIndex;
          const total = gradient === "text" ? text.length : wordLength;
          const offset = total > 1 ? (charIdx / (total - 1)) * 100 : 0;

          const gradientStyle =
            gradient !== "none"
              ? {
                  backgroundSize: `${total * 100}% 100%`,
                  backgroundPosition: `${offset}% 0`,
                  backgroundRepeat: "no-repeat" as const,
                }
              : {};

          return (
            <span
              key={charIndex}
              className="rolling-char relative inline-block overflow-hidden h-[1.2em] align-bottom"
            >
              <span
                className={`char-part block leading-[1.1em] ${padding ? "px-[0.02em]" : ""} ${charClassName}`}
                style={gradientStyle}
              >
                {char}
              </span>
              <span
                className={`char-part block absolute top-0 left-0 leading-[1.2em] ${padding ? "px-[0.02em]" : ""} ${charClassName}`}
                style={gradientStyle}
              >
                {char}
              </span>
            </span>
          );
        });

        const result = (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap ">{wordSpans}</span>
            {wordIndex < words.length - 1 && (
              <span
                className={`rolling-char relative inline-block overflow-hidden h-[1em] align-bottom ${cursor ? "w-[0.25em]" : "w-[0.3em]"}`}
              >
                <span className="char-part block leading-[1em]">&nbsp;</span>
                <span className="char-part block absolute top-0 left-0 leading-[1em]">
                  &nbsp;
                </span>
              </span>
            )}
          </React.Fragment>
        );

        globalCharIndex += word.length + 1; // +1 for the space
        return result;
      })}
    </span>
  );
};

export default RollingText;
