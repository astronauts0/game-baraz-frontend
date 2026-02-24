import type { Operation } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusVariantMap: Record<Operation["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Processing: "bg-blue-50 text-blue-700 border-blue-100",
  Pending: "bg-slate-50 text-slate-700 border-slate-200",
};

export function StatusBadge({ status }: { status: Operation["status"] }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${statusVariantMap[status] ?? ""}`}
    >
      {status}
    </Badge>
  );
}
