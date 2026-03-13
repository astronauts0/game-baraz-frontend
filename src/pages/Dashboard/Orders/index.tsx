import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { type Order } from "@/types";
import { INITIAL_ORDERS } from "@/constants";
import ContainerDiv from "@/components/shared/ContainerDiv";

import SearchPrimary from "@/components/shared/Form/SearchPrimary";
import SectionTop from "@/components/global/SectionTop";
import SelectPrimary from "@/components/shared/Form/SelectPrimary";
import InfiniteScrollPrimary from "@/components/shared/InfiniteScrollPrimary";
import { ScrollArea } from "@/components/ui/scroll-area";

import { OrdersTabs } from "./components/OrdersTabs";
import { OrderCard } from "./components/OrderCard";
import { EmptyOrdersState } from "./components/EmptyOrdersState";
import { OrdersStats } from "./components/OrdersStats";

// ── Types ────────────────────────────────────────────────────────────────────
type Tab = "All" | "Active" | "History";
type TypeFilter = "All" | "Buy" | "Sell";

// ── Mock data generator (for infinite-scroll demo) ───────────────────────────
const generateMockOrders = (count: number, offset: number): Order[] => {
  const games = [
    "Valorant",
    "Fortnite",
    "CS:GO",
    "League of Legends",
    "Overwatch 2",
  ];
  const statuses = [
    "Completed",
    "Processing",
    "Pending",
    "Cancelled",
    "Dispute",
  ] as Order["status"][];
  const types = ["Buy", "Sell"] as Order["type"][];
  const assets = [
    "Vandal Skin",
    "Operator Skin",
    "Rare Account",
    "Points Code",
    "Knife Skin",
    "Rank Boost",
  ];

  return Array.from({ length: count }, (_, i) => {
    const suffix = Math.floor(Math.random() * 9000) + 1000;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return {
      id: `ORD-${offset + i + 1000}-${suffix}`,
      assetName: `${assets[Math.floor(Math.random() * assets.length)]} #${suffix}`,
      game: games[Math.floor(Math.random() * games.length)],
      price: Math.floor(Math.random() * 20000) + 500,
      date: `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • ${Math.floor(Math.random() * 23)}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      image: `https://picsum.photos/seed/${offset + i}/200/200`,
      counterparty: `User_${Math.floor(Math.random() * 5000)}`,
      type: types[Math.floor(Math.random() * types.length)],
    };
  });
};

// ── Page ─────────────────────────────────────────────────────────────────────
interface OrdersPageProps {
  onInitiateDispute?: (order: Order) => void;
  onChatClick?: (order: Order) => void;
}

const OrdersPage = ({
  onInitiateDispute: propOnInitiateDispute,
  onChatClick: propOnChatClick,
}: OrdersPageProps) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");

  // Filtered list
  const filteredOrders = useMemo(
    () =>
      orders.filter((o) => {
        if (
          activeTab === "Active" &&
          ["Completed", "Cancelled"].includes(o.status)
        )
          return false;
        if (
          activeTab === "History" &&
          !["Completed", "Cancelled"].includes(o.status)
        )
          return false;
        if (typeFilter !== "All" && o.type !== typeFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            o.id.toLowerCase().includes(q) ||
            o.assetName.toLowerCase().includes(q) ||
            o.game.toLowerCase().includes(q) ||
            o.counterparty.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [orders, activeTab, typeFilter, searchQuery],
  );

  // Infinite scroll loader
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setOrders((prev) => {
        const next = [...prev, ...generateMockOrders(5, prev.length)];
        if (next.length > 50) setHasMore(false);
        return next;
      });
      setIsLoadingMore(false);
    }, 1000);
  }, [isLoadingMore, hasMore]);

  return (
    <ContainerDiv className="py-10 md:py-20 space-y-8">
      <SectionTop
        title="My Orders"
        description="Track and manage all your transactions, disputes, and order history."
      >
        <SearchPrimary
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search orders by ID, asset, or game"
          className="w-full lg:w-80"
        />

        <SelectPrimary
          options={[
            { label: "All Orders", value: "All" },
            { label: "Buy Orders", value: "Buy" },
            { label: "Sell Orders", value: "Sell" },
          ]}
          value={typeFilter}
          onChange={(val) => setTypeFilter(val as TypeFilter)}
          placeholder="Filter by type"
          SelectTriggerClass="h-9!"
        />
      </SectionTop>

      <OrdersStats orders={orders} />

      <OrdersTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          <ScrollArea
            className="h-[70vh] pr-4 border-b border-black"
            viewportProps={{ id: "orders-scroll-viewport" }}
          >
            <InfiniteScrollPrimary
              dataLength={filteredOrders.length}
              next={loadMore}
              hasMore={hasMore}
              scrollableTarget="orders-scroll-viewport"
              className="space-y-4 pt-1"
            >
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onChat={
                    propOnChatClick ||
                    ((o) => navigate(`/dashboard/orders/${o.id}/chat`))
                  }
                  onInitiateDispute={
                    propOnInitiateDispute ||
                    ((o) =>
                      navigate("/dashboard/dispute/create", {
                        state: { order: o },
                      }))
                  }
                />
              ))}
            </InfiniteScrollPrimary>
          </ScrollArea>
        ) : (
          <EmptyOrdersState />
        )}
      </div>
    </ContainerDiv>
  );
};

export default OrdersPage;
