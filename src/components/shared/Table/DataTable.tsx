import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
} from "@tanstack/react-table";
import { Search, Inbox, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SortIcon } from "./SortIcon";
import { TableSkeleton } from "./TableSkeleton";
import { ColumnTogglePanel } from "./ColumnTogglePanel";
import { TablePagination } from "./TablePagination";
import type { ColumnDef, DataTableProps } from "@/types";

export function DataTable<TData>({
  data,
  columns: columnsProp,
  title,
  description,
  searchable = true,
  searchPlaceholder = "Search...",
  sortable = true,
  paginated = true,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  selectable = false,
  onSelectionChange,
  columnToggle = false,
  emptyMessage = "No data found",
  emptyDescription = "Try adjusting your search or filters.",
  toolbar,
  className,
  isLoading = false,
  manualPagination = false,
  totalCount,
  onPaginationChange,
  onSortingChange: onSortingChangeProp,
  onGlobalFilterChange: onGlobalFilterChangeProp,
}: DataTableProps<TData> & {
  manualPagination?: boolean;
  totalCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onGlobalFilterChange?: (filter: string) => void;
}) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // ── Selection column ───────────────────────────────────────────────────────
  const selectionColumn: ColumnDef<TData> = useMemo(
    () => ({
      id: "__select__",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
          className="h-3.5 w-3.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          className="h-3.5 w-3.5"
        />
      ),
    }),
    [],
  );

  const columns = useMemo(
    () => (selectable ? [selectionColumn, ...columnsProp] : columnsProp),
    [selectable, columnsProp, selectionColumn],
  );

  // ── Table instance ─────────────────────────────────────────────────────────
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination,
    pageCount: manualPagination
      ? Math.ceil((totalCount ?? 0) / pagination.pageSize)
      : undefined,

    enableSorting: sortable,
    enableRowSelection: selectable,

    onSortingChange: (updater) => {
      setSorting((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onSortingChangeProp?.(next);
        return next;
      });
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: (updater) => {
      setGlobalFilter((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onGlobalFilterChangeProp?.(next);
        return next;
      });
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return next;
      });
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onPaginationChange?.(next);
        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualPagination ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
  });

  // Sync selection change to parent
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((r) => r.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, table]);

  const rows = table.getRowModel().rows;
  const isEmpty = data.length === 0 && !isLoading;
  const noResults = !isEmpty && rows.length === 0 && !isLoading;
  const selectedCount = table.getSelectedRowModel().rows.length;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        "flex flex-col min-w-0 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm",
        className,
      )}
    >
      {/* ── Header ── */}
      {(title || searchable || columnToggle || toolbar) && (
        <div className="flex flex-col gap-4 p-5 pb-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Title */}
          {(title || description) && (
            <div className="min-w-0">
              {title && (
                <h2 className="truncate text-base font-bold uppercase tracking-tight text-slate-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-0.5 text-xs text-slate-500">{description}</p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            {/* Global search */}
            {searchable && (
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  placeholder={searchPlaceholder}
                  value={globalFilter ?? ""}
                  onChange={(e) =>
                    table.setGlobalFilter(String(e.target.value))
                  }
                  className="h-8 pl-8 text-xs sm:w-48"
                />
                {globalFilter && (
                  <button
                    onClick={() => table.setGlobalFilter("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            )}

            {/* Column toggle */}
            {columnToggle && <ColumnTogglePanel table={table} />}

            {/* Custom toolbar slot */}
            {toolbar}
          </div>
        </div>
      )}

      {/* ── Selection banner ── */}
      {selectable && selectedCount > 0 && (
        <div className="mx-5 mb-2 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-2">
          <span className="text-xs font-semibold text-primary">
            {selectedCount} row{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => table.resetRowSelection()}
            className="text-xs font-bold text-primary hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* ── Table Scroll Area ── */}
      <div className="w-full grow overflow-auto custom-scrollbar px-5 pb-4 max-h-[500px]">
        <Table className="min-w-max w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-slate-100 hover:bg-transparent"
              >
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHead key={header.id} className="py-3 px-3">
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <SortIcon direction={header.column.getIsSorted()} />
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableSkeleton rows={pagination.pageSize} cols={columns.length} />
            ) : isEmpty || noResults ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50">
                      <Inbox size={26} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {noResults
                          ? `No results for "${globalFilter}"`
                          : emptyMessage}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {noResults
                          ? "Try a different search term."
                          : emptyDescription}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-slate-50 transition-colors hover:bg-slate-50/70 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-3.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer / Pagination ── */}
      {paginated && !isEmpty && !isLoading && (
        <TablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  );
}

export default DataTable;
