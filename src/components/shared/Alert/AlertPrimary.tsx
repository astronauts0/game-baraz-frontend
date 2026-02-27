import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface AlertPrimaryProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  icon?: ReactNode;

  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;

  // icon styling centralized
  iconWrapClassName?: string;
  iconClassName?: string;

  children?: ReactNode;
}

const AlertPrimary = ({
  title,
  description,
  variant = "default",
  icon,
  className,
  titleClassName,
  descriptionClassName,
  iconWrapClassName,
  iconClassName,
  children,
}: AlertPrimaryProps) => {
  const content = children ?? description;

  return (
    <Alert
      variant={variant}
      className={cn("flex items-start gap-3", className)}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 mt-0.5 inline-flex items-center justify-center",
            iconWrapClassName,
          )}
        >
          {/* icon sizing/color centralized here */}
          <span
            className={cn("[&>svg]:size-4 [&>svg]:shrink-0", iconClassName)}
          >
            {icon}
          </span>
        </span>
      )}

      <div className="flex flex-col gap-1">
        {title && (
          <AlertTitle className={cn("text-sm", titleClassName)}>
            {title}
          </AlertTitle>
        )}

        {content && (
          <AlertDescription className={cn("text-xs", descriptionClassName)}>
            {content}
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
};

export default AlertPrimary;
