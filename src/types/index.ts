import type { LucideIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

export interface FeaturedListing {
  id: number;
  title: string;
  seller: string;
  sellerStatus: "VERIFIED" | "ELITE" | "INSTANT";
  sellerStatusColor: string;
  price: string;
  badges: Array<{
    text: string;
    colorClass: string;
    borderClass: string;
    bgClass: string;
  }>;
  stats: Array<{ label: string; value: string }>;
  image: string;
  actionText: string;
  isFeatured?: boolean;
}

export interface Listing {
  id: number;
  title: string;
  game: string;
  seller: string;
  sellerAvatar?: string;
  sellerTier: "VERIFIED" | "ELITE" | "GODLIKE";
  sellerStats: {
    rating: number;
    reviews: number;
    sold: number;
    trust: number;
  };
  price: number;
  image: string;
  description: string;
  badges: string[];
  stats: { label: string; value: string }[];
  deliveryTime: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

export interface BlogPost {
  id: number;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  featured?: boolean;
}

export type ThreatCardProps = {
  id: string;
  title: string;
  description: string;
  risk: string;
  riskColor: string;
  protocol: string;
  protocolSub: string;
  icon: LucideIcon;
  accent: string;
};

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  timestamp: number;
  verified: boolean;
  content: string;
  helpful: number;
  images: string[];
  sellerResponse?: string;
}

export interface Operation {
  id: string;
  assetId: string;
  game: string;
  gameIcon?: string; // URL to game icon
  buyerId: string;
  buyerAvatar?: string;
  amount: number;
  status: "Completed" | "Pending" | "Processing";
  action: string;
  date: string;
}

export interface SalesDataPoint {
  day: string;
  revenue: number;
}

export interface InventoryItem {
  name: string;
  value: number;
  color: string;
}

export interface DisputeMessage {
  id: string;
  sender: "User" | "Admin" | "System";
  text: string;
  timestamp: string;
  isEvidence?: boolean;
}

export interface Dispute {
  id: string;
  orderId: string;
  reason: string;
  status: "Open" | "Under Review" | "Resolved" | "Closed";
  dateOpened: string;
  description: string;
  messages: DisputeMessage[];
  priority: "Low" | "Medium" | "High";
}

export interface Order {
  id: string;
  assetName: string;
  game: string;
  price: number;
  date: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled" | "Dispute";
  image: string;
  counterparty: string;
  type: "Buy" | "Sell";
}

export interface DashboardListing {
  id: string;
  title: string;
  game: string;
  price: number;
  status: "Active" | "Draft" | "Sold" | "Inactive";
  views: number;
  likes: number;
  createdAt: string;
  image: string;
}

export interface DataTableProps<TData> {
  /** The data array to display */
  data: TData[];

  /** Column definitions (TanStack ColumnDef) */
  columns: ColumnDef<TData>[];

  /** Table title shown in the header */
  title?: string;

  /** Optional subtitle/description */
  description?: string;

  /** Enable global search input */
  searchable?: boolean;
  searchPlaceholder?: string;

  /** Enable per-column filtering */
  filterable?: boolean;

  /** Enable sorting on columns */
  sortable?: boolean;

  /** Enable pagination */
  paginated?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];

  /** Enable row selection (checkbox column prepended automatically) */
  selectable?: boolean;
  onSelectionChange?: (selectedRows: TData[]) => void;

  /** Enable column visibility toggle panel */
  columnToggle?: boolean;

  /** Custom empty state message */
  emptyMessage?: string;
  emptyDescription?: string;

  /** Toolbar slot – rendered beside search/controls */
  toolbar?: React.ReactNode;

  /** Additional class on the root wrapper */
  className?: string;

  /** Loading state */
  isLoading?: boolean;
}

export type { ColumnDef };