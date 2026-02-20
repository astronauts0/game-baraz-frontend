import MainHeading from "@/components/shared/MainHeading";
import { SectionBadge } from "@/components/shared/SectionBadge";
import RollingText from "@/utils/RollingText";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  badgeDot?: string;
  topText: string;
  bottomText?: string;
  description?: string;
  gradientPrimary?: boolean;
  rollingOptions?: {
    top?: Partial<React.ComponentProps<typeof RollingText>>;
    bottom?: Partial<React.ComponentProps<typeof RollingText>>;
  };
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeDot,
  topText,
  bottomText,
  description,
  gradientPrimary = false,
  rollingOptions,
  className,
}) => {
  return (
    <div className={cn("text-center mb-24 md:mb-32 anim-header", className)}>
      {badge && <SectionBadge dotClassName={badgeDot}>{badge}</SectionBadge>}

      <MainHeading className="my-3">
        <RollingText text={topText} {...rollingOptions?.top} />
        {bottomText && (
          <>
            <br />
            <RollingText
              text={bottomText}
              {...rollingOptions?.bottom}
              charClassName={cn(
                gradientPrimary
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400"
                  : "text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500",
                rollingOptions?.bottom?.charClassName,
              )}
            />
          </>
        )}
      </MainHeading>

      {description && (
        <p className="max-w-xl mx-auto text-slate-500 font-medium text-sm md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
