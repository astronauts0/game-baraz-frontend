import { cn } from "@/lib/utils";

interface BackgroundFxProps {
  className?: string;
  height?: string;
  from?: string;
  to?: string;
}

const BackgroundFx = ({
  className,
  height = "h-[600px]",
  from = "from-primary/50",
  to = "to-transparent",
}: BackgroundFxProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full pointer-events-none overflow-hidden",
        "bg-linear-to-b",
        from,
        to,
        height,
        className,
      )}
    />
  );
};

export default BackgroundFx;
