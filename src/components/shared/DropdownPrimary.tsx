import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type DropdownOption = {
  label: string;
  value: string;
};

type Props = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;

  className?: string; // applied to Select
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
};

const DropdownPrimary: React.FC<Props> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select",

  className,
  triggerClassName,
  contentClassName,
  itemClassName,
}) => {
  return (
    <div className={cn(className)}>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={cn(
            "rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-wide border-black cursor-pointer",
            triggerClassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className={cn("rounded-xl border-black", contentClassName)}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                itemClassName,
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownPrimary;
