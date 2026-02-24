import React from "react";
import type { ColumnDef, Operation } from "@/types";
import { StatusBadge } from "./StatusBadge";
import DataTable from "@/components/shared/Table/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecentOperationsProps {
  data?: Operation[];
  title?: string;
  className?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const RecentOperations: React.FC<RecentOperationsProps> = ({
  data = [],
  title = "RECENT OPERATIONS",
  className,
}) => {
  // ── Column Definitions ──────────────────────────────────────────────────────
  const columns: ColumnDef<Operation>[] = [
    {
      accessorKey: "assetId",
      header: "Asset ID",
      cell: ({ getValue }) => (
        <span className="text-sm font-medium text-slate-600">
          {(getValue() as string) || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "game",
      header: "Game",
      cell: ({ getValue }) => (
        <span className="text-sm font-semibold text-slate-900">
          {(getValue() as string) || "Unknown"}
        </span>
      ),
    },
    {
      accessorKey: "buyerId",
      header: "Buyer",
      enableSorting: false,
      cell: ({ getValue }) => {
        const id = (getValue() as string) || "?";
        return (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase text-slate-500">
              {id.charAt(0)}
            </div>
            <span className="text-sm text-slate-600">{id}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => (
        <span className="text-sm text-slate-500">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) => (
        <span className="text-sm font-bold text-slate-900">
          Rs {((getValue() as number) || 0).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <StatusBadge
          status={(getValue() as Operation["status"]) ?? "Pending"}
        />
      ),
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <DataTable<Operation>
      data={data}
      columns={columns}
      title={title}
      className={className}
      description="View and search thru recent operational transaction records."
      searchPlaceholder="Search records..."
      paginated={true}
      defaultPageSize={5}
      pageSizeOptions={[5, 10, 20]}
      emptyMessage="No operations recorded"
    />
  );
};

export default RecentOperations;
