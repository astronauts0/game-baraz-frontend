import React from "react";
import { cn } from "@/lib/utils";

interface RotateBoxProps {
  children: React.ReactNode;
  className?: string;
}

const RotateBox = ({ children, className }: RotateBoxProps) => {
  return (
    <div
      className={cn(
        "size-12 md:size-14 rounded-xl",
        "flex items-center justify-center",
        "transition-all duration-300 shrink-0",
        "border border-primary/30 shadow-primary",
        "rotate-8 group-hover:rotate-0 hover:rotate-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default RotateBox;
