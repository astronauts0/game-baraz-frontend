import type {
  SalesDataPoint,
  InventoryItem,
  Operation,
  DashboardListing,
  Order,
} from "@/types";

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-7782-XJ",
    assetName: "Reaver Vandal - Max Upgrades",
    game: "Valorant",
    price: 3400,
    date: "Oct 24, 2023 • 14:30",
    status: "Processing",
    image: "https://picsum.photos/seed/reaver/200/200",
    counterparty: "ViperMain",
    type: "Sell",
  },
  {
    id: "ORD-9921-MC",
    assetName: "Galaxy Skin Account",
    game: "Fortnite",
    price: 8200,
    date: "Oct 22, 2023 • 09:15",
    status: "Completed",
    image: "https://picsum.photos/seed/galaxy/200/200",
    counterparty: "NinjaFan_01",
    type: "Sell",
  },
  {
    id: "ORD-1102-DL",
    assetName: "Dragon Lore (Factory New)",
    game: "CS:GO",
    price: 145000,
    date: "Oct 20, 2023 • 18:45",
    status: "Completed",
    image: "https://picsum.photos/seed/dragon/200/200",
    counterparty: "ProTrader_X",
    type: "Buy",
  },
  {
    id: "ORD-3321-LZ",
    assetName: "10,000 VP Code",
    game: "Valorant",
    price: 8500,
    date: "Oct 18, 2023 • 11:20",
    status: "Cancelled",
    image: "https://picsum.photos/seed/vp/200/200",
    counterparty: "ScamShield_Bot",
    type: "Buy",
  },
];
export const GAMES = [
  "All",
  "Valorant",
  "Fortnite",
  "CS:GO",
  "Warzone",
  "Genshin",
];

export const getGridClass = (columns: number): string => {
  switch (columns) {
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case 5:
      return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};

export const sortOptions = [
  { label: "Sort: Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
  { label: "Newest Arrivals", value: "newest" },
];

export const SALES_DATA: SalesDataPoint[] = [
  { day: "01", revenue: 20000 },
  { day: "05", revenue: 25000 },
  { day: "10", revenue: 28000 },
  { day: "15", revenue: 65000 },
  { day: "20", revenue: 95000 },
  { day: "25", revenue: 75000 },
  { day: "30", revenue: 85000 },
];

export const INVENTORY_DATA: InventoryItem[] = [
  { name: "Valorant", value: 65, color: "#8b5cf6" }, // Violet 500
  { name: "Fortnite", value: 25, color: "#3b82f6" }, // Blue 500
  { name: "Other", value: 10, color: "#14b8a6" }, // Teal 500
];

export const RECENT_OPERATIONS: Operation[] = [
  {
    id: "1",
    assetId: "#AF-9981",
    game: "Valorant - Ascendant 2",
    buyerId: "JaceDoe_99",
    amount: 12500,
    status: "Completed",
    action: "Transfer",
    date: "2 mins ago",
  },
  {
    id: "2",
    assetId: "#FN-2241",
    game: "Fortnite - Galaxy Skin",
    buyerId: "NinjaFan_01",
    amount: 8200,
    status: "Processing",
    action: "Escrow",
    date: "15 mins ago",
  },
  {
    id: "3",
    assetId: "#CS-1102",
    game: "CS:GO - Dragon Lore",
    buyerId: "ProTrader_X",
    amount: 145000,
    status: "Completed",
    action: "Withdrawal",
    date: "1 hour ago",
  },
  {
    id: "4",
    assetId: "#VL-5521",
    game: "Valorant - Reaver Vandal",
    buyerId: "ViperMain",
    amount: 3400,
    status: "Completed",
    action: "Sale",
    date: "2 hours ago",
  },
  {
    id: "5",
    assetId: "#LOL-9921",
    game: "League - All Champs",
    buyerId: "MidOrFeed",
    amount: 6500,
    status: "Pending",
    action: "Sale",
    date: "4 hours ago",
  },
  {
    id: "6",
    assetId: "#FN-8822",
    game: "Fortnite - Black Knight",
    buyerId: "OG_Player",
    amount: 22000,
    status: "Completed",
    action: "Transfer",
    date: "5 hours ago",
  },
  {
    id: "7",
    assetId: "#VP-1000",
    game: "Valorant - 10000 VP",
    buyerId: "Smurf_Jet",
    amount: 8500,
    status: "Processing",
    action: "Escrow",
    date: "1 day ago",
  },
  {
    id: "8",
    assetId: "#CS-Knife",
    game: "CS:GO - Karambit Fade",
    buyerId: "KnifeCollec",
    amount: 89000,
    status: "Completed",
    action: "Withdrawal",
    date: "2 days ago",
  },
  {
    id: "9",
    assetId: "#VL-9911",
    game: "Valorant - RGX Bundle",
    buyerId: "NeonMain_22",
    amount: 7100,
    status: "Completed",
    action: "Sale",
    date: "3 days ago",
  },
  {
    id: "10",
    assetId: "#OW-1122",
    game: "Overwatch - Pink Mercy",
    buyerId: "SupportGod",
    amount: 15000,
    status: "Pending",
    action: "Escrow",
    date: "3 days ago",
  },
  {
    id: "11",
    assetId: "#AP-8812",
    game: "Apex - Heirloom Acc",
    buyerId: "Wraith_TTV",
    amount: 45000,
    status: "Processing",
    action: "Sale",
    date: "4 days ago",
  },
  {
    id: "12",
    assetId: "#MC-9921",
    game: "Minecraft - OG Name",
    buyerId: "BlockBuilder",
    amount: 12000,
    status: "Completed",
    action: "Transfer",
    date: "1 week ago",
  },
];

export const INITIAL_LISTINGS: DashboardListing[] = [
  {
    id: "LST-001",
    title: "Reaver Vandal - Max Upgrades",
    game: "Valorant",
    price: 3400,
    status: "Active",
    views: 1240,
    likes: 45,
    createdAt: "Oct 24, 2023",
    image: "https://picsum.photos/seed/reaver/200/200",
  },
  {
    id: "LST-002",
    title: "Fortnite OG Account (Black Knight)",
    game: "Fortnite",
    price: 22500,
    status: "Active",
    views: 3500,
    likes: 120,
    createdAt: "Oct 20, 2023",
    image: "https://picsum.photos/seed/blackknight/200/200",
  },
  {
    id: "LST-003",
    title: "CS:GO Knife Bundle",
    game: "CS:GO",
    price: 8900,
    status: "Draft",
    views: 0,
    likes: 0,
    createdAt: "Oct 26, 2023",
    image: "https://picsum.photos/seed/knifebundle/200/200",
  },
  {
    id: "LST-004",
    title: "League of Legends - Diamond 2",
    game: "League of Legends",
    price: 4500,
    status: "Sold",
    views: 890,
    likes: 32,
    createdAt: "Oct 15, 2023",
    image: "https://picsum.photos/seed/league/200/200",
  },
  {
    id: "LST-005",
    title: "Apex Legends Heirloom Account",
    game: "Apex Legends",
    price: 15000,
    status: "Inactive",
    views: 450,
    likes: 12,
    createdAt: "Sep 30, 2023",
    image: "https://picsum.photos/seed/apex/200/200",
  },
];
