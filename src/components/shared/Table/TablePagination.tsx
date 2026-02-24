import type { Table as TableInstance } from "@tanstack/react-table";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TablePaginationProps<TData> {
  table: TableInstance<TData>;
  pageSizeOptions?: number[];
}

export function TablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50],
}: TablePaginationProps<TData>) {
  const { pagination } = table.getState();
  const isManual = table.options.manualPagination;

  // Use getPrePaginationRowModel to get the count of ALL rows matching the search/filter
  const totalFilteredCount = table.getPrePaginationRowModel().rows.length;
  const totalCount = isManual
    ? table.options.pageCount
      ? table.options.pageCount * pagination.pageSize
      : totalFilteredCount
    : totalFilteredCount;

  // Use pagination rows to get the exact count of what's on the screen
  const paginationRows = table.getPaginationRowModel().rows;

  const pageStart =
    totalCount === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
  const pageEnd = totalCount === 0 ? 0 : pageStart + paginationRows.length - 1;

  return (
    <div className="mt-auto flex flex-col items-center justify-between gap-3 rounded-b-2xl border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 sm:flex-row">
      {/* Info */}
      <p className="text-xs font-medium">
        {totalCount === 0
          ? "No records"
          : `Showing ${pageStart}–${pageEnd} of ${totalCount} records`}
      </p>

      <div className="flex items-center gap-3">
        {/* Page size */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">Rows:</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium outline-none focus:border-primary cursor-pointer"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-7 w-7 p-0"
            title="First page"
          >
            <ChevronsLeft size={13} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-7 w-7 p-0"
            title="Previous page"
          >
            <ChevronLeft size={13} />
          </Button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
            const totalPages = table.getPageCount();
            const current = pagination.pageIndex;

            // Sliding window of 5 pages
            let start = Math.max(0, current - 2);
            const end = Math.min(start + 4, totalPages - 1);
            start = Math.max(0, end - 4);

            return start + i;
          })
            .filter((p) => p < table.getPageCount())
            .map((pageIdx) => (
              <button
                key={pageIdx}
                onClick={() => table.setPageIndex(pageIdx)}
                className={cn(
                  "h-7 w-7 rounded-md text-xs font-bold transition-colors",
                  pagination.pageIndex === pageIdx
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {pageIdx + 1}
              </button>
            ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-7 w-7 p-0"
            title="Next page"
          >
            <ChevronRight size={13} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-7 w-7 p-0"
            title="Last page"
          >
            <ChevronsRight size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
}
