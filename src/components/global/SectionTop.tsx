import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionTopProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
}

const SectionTop = ({
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: SectionTopProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4",
        className,
      )}
    >
      <div>
        <h1
          className={cn(
            "text-2xl sm:text-3xl font-bold tracking-tight uppercase",
            titleClassName,
          )}
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              "text-slate-500 sm:text-base text-sm",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className={cn("flex items-center flex-wrap gap-2", actionsClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionTop;
