import { cn } from "@/lib/utils";

export const DownToUpCurveSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 30"
      className={cn("w-full h-full overflow-visible", className)}
    >
      <path
        d="M0,25 C10,25 15,10 25,10 C35,10 40,20 50,20 C60,20 70,5 80,5 L100,0"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
