import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import RotateBox from "@/components/shared/RotateBox";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
  isDark?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  icon,
  isDark = false,
}) => {
  const Icon = LucideIcons[icon] as React.ElementType;

  return (
    <div
      className={cn(
        "step-card group relative p-8 md:p-10 rounded-2xl transition-all duration-500 flex flex-col items-center text-center",
        isDark ? "bg-primary hover:-translate-y-2 z-10 md:-mt-6" : "glass_box",
      )}
    >
      <div className="mb-8 relative">
        <RotateBox
          className={cn(
            "size-28! rounded-2xl border-2 transition-all duration-500 shadow-sm",
            isDark ? "glass_box bg-transparent!" : "glass_box",
          )}
        >
          {Icon && (
            <Icon
              size={48}
              strokeWidth={1.5}
              className={isDark ? "text-white" : "text-black"}
            />
          )}
        </RotateBox>
        <div
          className={cn(
            "absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg border-4",
            isDark
              ? "bg-primary text-white border-white"
              : "bg-primary text-white border-white",
          )}
        >
          {number}
        </div>
      </div>

      <h3
        className={cn(
          "text-2xl font-display font-black mb-3",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "font-medium leading-relaxed text-sm",
          isDark ? "text-white" : "text-slate-500",
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default StepCard;
