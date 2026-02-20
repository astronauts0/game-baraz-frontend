import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextPrimaryProps {
  children: React.ReactNode;
  className?: string;
}

const GradientTextPrimary: React.FC<GradientTextPrimaryProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default GradientTextPrimary;
