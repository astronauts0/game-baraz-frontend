import React from "react";
import { cn } from "@/lib/utils";

interface MainHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const MainHeading = ({ children, className }: MainHeadingProps) => {
  return (
    <h1
      className={cn(
        "anim-title text-5xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default MainHeading;
