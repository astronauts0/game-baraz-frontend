import React from "react";
import { SectionBadge } from "./SectionBadge";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  subtitle?: string | React.ReactNode;
  variant?: "full" | "fit";
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
  showMessage?: boolean;
  badgeDotClass?: string;
};

const ComingSoonOverlay: React.FC<Props> = ({
  message = "Coming Soon",
  subtitle = "Real data integration in progress.",
  variant = "full",
  className,
  showBadge = true,
  badgeText = "In Development",
  showMessage = true,
  badgeDotClass,
}) => {
  if (variant === "full") {
    return (
      <div
        className={cn(
          "absolute inset-0 z-40 flex flex-col items-center justify-center glass_box backdrop-blur-xs!",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-3">
          {showBadge && (
            <SectionBadge dotClassName={badgeDotClass}>
              {badgeText}
            </SectionBadge>
          )}

          {showMessage && (
            <>
              <h3 className="text-xl font-bold md:text-4xl">{message}</h3>

              <p className="max-w-xl px-5 text-center text-xs font-medium text-slate-500 md:text-sm">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex items-center justify-center bg-white/40 backdrop-blur-xs transition-all duration-300 group-hover:bg-white/50",
        className,
      )}
    >
      {showBadge && (
        <SectionBadge dotClassName={badgeDotClass}>{badgeText}</SectionBadge>
      )}
    </div>
  );
};

export default ComingSoonOverlay;
