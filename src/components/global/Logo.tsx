import { Zap } from "lucide-react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps extends Omit<LinkProps, "to"> {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center space-x-2 cursor-pointer group",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-8 h-8 sm:w-10 sm:h-10",
          "bg-gradient-to-br from-indigo-600 to-violet-600",
          "rounded-lg sm:rounded-xl",
          "flex items-center justify-center shrink-0 text-white",
          "group-hover:scale-110 transition-transform duration-300",
        )}
      >
        <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
      </div>

      <span
        className={cn(
          "font-bold text-lg sm:text-xl tracking-tight uppercase text-inherit",
        )}
      >
        GameBazaar
      </span>
    </Link>
  );
};

export default Logo;
