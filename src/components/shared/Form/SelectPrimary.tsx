import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Import the cn utility

interface SelectPrimaryProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string; // Optional className for overall select
  SelectTriggerClass?: string; // Optional class for SelectTrigger
  SelectContentClass?: string; // Optional class for SelectContent
  SelectItemClass?: string; // Optional class for SelectItem
  disabled?: boolean;
}

const SelectPrimary = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  SelectTriggerClass,
  SelectContentClass,
  SelectItemClass,
  disabled,
}: SelectPrimaryProps) => {
  const handleValueChange = (val: string) => {
    if (val !== "none") {
      onChange(val);
    }
  };

  return (
    <div className={cn(className)}>
      <Select
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn("w-full h-12! hover:bg-slate-50", SelectTriggerClass)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn(SelectContentClass)}>
          {!options || options.length === 0 ? (
            <SelectItem
              value="none"
              className="text-muted-foreground cursor-default h-11!"
            >
              No options available
            </SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(SelectItemClass)}
              >
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPrimary;
