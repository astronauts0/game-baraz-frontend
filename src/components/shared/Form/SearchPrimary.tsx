import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SearchPrimaryProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showButton?: boolean;
}

const SearchPrimary = forwardRef<HTMLInputElement, SearchPrimaryProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSubmit,
      placeholder = "SEARCH...",
      className,
      inputClassName,
      showButton = true,
    },
    ref,
  ) => {
    return (
      <div className={cn("relative w-full group", className)}>
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
          <span className="text-primary font-mono font-bold text-lg">
            {">"}
          </span>
        </div>

        <Input
          ref={ref}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit?.();
            }
          }}
          placeholder={placeholder}
          className={cn(
            "w-full cursor-copy rounded-2xl pl-10 h-12 text-sm font-mono font-medium tracking-wide text-black border-black",
            showButton ? "pr-24" : "pr-4",
            inputClassName,
          )}
        />

        {showButton && (
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-auto">
            <Button
              size="sm"
              onClick={() => onSubmit?.()}
              variant="outline"
              className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide flex items-center gap-2 cursor-copy"
              type="button"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        )}
      </div>
    );
  },
);

SearchPrimary.displayName = "SearchPrimary";

export default SearchPrimary;
