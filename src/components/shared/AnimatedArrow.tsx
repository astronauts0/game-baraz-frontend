import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction =
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "topRight"
  | "topLeft"
  | "bottomRight"
  | "bottomLeft";

interface AnimatedArrowProps {
  children?: React.ReactNode;
  direction?: Direction;
  className?: string;
  iconClassName?: string;
  iconSpanClassName?: string;
}

const directionMap: Record<Direction, string> = {
  right: "group-hover:translate-x-1",
  left: "group-hover:-translate-x-1",
  top: "group-hover:-translate-y-1",
  bottom: "group-hover:translate-y-1",
  topRight: "group-hover:translate-x-1 group-hover:-translate-y-1",
  topLeft: "group-hover:-translate-x-1 group-hover:-translate-y-1",
  bottomRight: "group-hover:translate-x-1 group-hover:translate-y-1",
  bottomLeft: "group-hover:-translate-x-1 group-hover:translate-y-1",
};

const AnimatedArrow = ({
  children,
  direction = "right",
  className,
  iconClassName,
  iconSpanClassName,
}: AnimatedArrowProps) => {
  return (
    <span className={cn("inline-flex items-center shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center transition-all duration-300 ease-out",
          "group-hover:text-primary",
          directionMap[direction],
          iconSpanClassName,
        )}
      >
        {children ?? <ArrowRight className={cn("size-5", iconClassName)} />}
      </span>
    </span>
  );
};

export default AnimatedArrow;
