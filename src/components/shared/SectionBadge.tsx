import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dotClassName?: string;
}

/**
 * SectionBadge Component
 * A senior-engineered reusable badge unit for section headers.
 * Combines shadcn/ui Badge with a pulsing status indicator.
 */
const SectionBadge = React.forwardRef<HTMLDivElement, SectionBadgeProps>(
  ({ children, className, dotClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border-slate-200 shadow-sm hover:bg-white/80 transition-all duration-300"
        >
          <span
            className={cn(
              "size-2 rounded-full animate-pulse shrink-0",
              dotClassName || "bg-primary",
            )}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold uppercase tracking-wider font-mono">
            {children}
          </span>
        </Badge>
      </div>
    );
  },
);

SectionBadge.displayName = "SectionBadge";

export { SectionBadge };
