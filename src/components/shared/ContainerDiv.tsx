import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerDivProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerDiv = forwardRef<HTMLDivElement, ContainerDivProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8", className)}
      >
        {children}
      </div>
    );
  },
);

ContainerDiv.displayName = "ContainerDiv";

export default ContainerDiv;
