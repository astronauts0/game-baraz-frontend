import { useState } from "react";
import type { Table as TableInstance } from "@tanstack/react-table";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ColumnTogglePanelProps<TData> {
  table: TableInstance<TData>;
}

export function ColumnTogglePanel<TData>({
  table,
}: ColumnTogglePanelProps<TData>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className={cn("gap-1.5 text-xs", open && "border-primary text-primary")}
      >
        <SlidersHorizontal size={13} />
        Columns
      </Button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 min-w-[160px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Toggle Columns
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <label
                    key={col.id}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Checkbox
                      checked={col.getIsVisible()}
                      onCheckedChange={(v) => col.toggleVisibility(!!v)}
                      className="h-3.5 w-3.5"
                    />
                    <span className="capitalize">
                      {typeof col.columnDef.header === "string"
                        ? col.columnDef.header
                        : col.id}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
