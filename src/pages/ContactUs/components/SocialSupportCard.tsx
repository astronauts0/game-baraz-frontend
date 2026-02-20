import React from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface SocialSupportCardProps {
  icon: LucideIcon | IconType;
  title: string;
  subtitle: string;
  href: string;
  className?: string;
}

const SocialSupportCard: React.FC<SocialSupportCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  href,
  className,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "glass_box px-6 py-4 md:p-8 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors bg-white/60 w-full",
        className,
      )}
    >
      <div className="flex items-center md:gap-6 gap-3 text-left">
        <RotateBox className="size-12 md:size-16 bg-primary text-white text-3xl md:text-4xl">
          <Icon />
        </RotateBox>
        <div>
          <h4 className="text-xl font-bold leading-tight">{title}</h4>
          <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
        </div>
      </div>

      <AnimatedArrow direction="topRight" iconClassName="-rotate-45 size-10" />
    </a>
  );
};

export default SocialSupportCard;
