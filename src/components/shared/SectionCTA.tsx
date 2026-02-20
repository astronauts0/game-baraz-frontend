import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SectionCTAProps {
  title: string;
  description?: string;
  buttonText: string;
  href: string;
  className?: string;
}

const SectionCTA = ({
  title,
  description,
  buttonText,
  href,
  className,
}: SectionCTAProps) => {
  return (
    <div
      className={cn("max-w-3xl mx-auto p-8 glass_box text-center", className)}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>

      {description && (
        <p className="text-slate-500 dark:text-muted-foreground font-medium mb-6 text-sm">
          {description}
        </p>
      )}

      <a href={href}>
        <Button size="lg">{buttonText}</Button>
      </a>
    </div>
  );
};

export default SectionCTA;
