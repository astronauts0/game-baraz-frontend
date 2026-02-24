import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, ri) => (
        <TableRow key={ri} className="border-slate-50">
          {Array.from({ length: cols }).map((_, ci) => (
            <TableCell key={ci} className="py-4">
              <Skeleton
                className={cn(
                  "h-4",
                  ci === 0 ? "w-24" : ci % 3 === 0 ? "w-16" : "w-32",
                )}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
