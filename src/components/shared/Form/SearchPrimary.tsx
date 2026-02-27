import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SearchPrimaryProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const SearchPrimary = forwardRef<HTMLInputElement, SearchPrimaryProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = "Search...",
      className,
      inputClassName,
      iconClassName,
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative flex-1 md:flex-initial min-w-[150px]",
          className,
        )}
      >
        <Search
          size={18}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-10",
            iconClassName,
          )}
        />

        <Input
          ref={ref}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn("pl-10 border-black", inputClassName)}
        />
      </div>
    );
  },
);

SearchPrimary.displayName = "SearchPrimary";

export default SearchPrimary;
