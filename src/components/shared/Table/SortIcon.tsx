import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface SortIconProps {
  direction: "asc" | "desc" | false;
}

export function SortIcon({ direction }: SortIconProps) {
  if (direction === "asc")
    return <ChevronUp size={13} className="text-primary" />;
  if (direction === "desc")
    return <ChevronDown size={13} className="text-primary" />;
  return <ChevronsUpDown size={13} className="opacity-40" />;
}
