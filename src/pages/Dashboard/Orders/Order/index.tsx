import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { INITIAL_ORDERS } from "@/constants";
import ContainerDiv from "@/components/shared/ContainerDiv";

// ── Sub-Components ───────────────────────────────────────────────────────────
import { OrderDetailsHeader } from "./components/OrderDetailsHeader";
import { OrderHeroSection } from "./components/OrderHeroSection";
import { OrderAssetCard } from "./components/OrderAssetCard";
import { OrderTransactionTimeline } from "./components/OrderTransactionTimeline";
import { OrderCounterpartyCard } from "./components/OrderCounterpartyCard";
import { OrderPaymentSummary } from "./components/OrderPaymentSummary";
import { OrderSupportActions } from "./components/OrderSupportActions";

// ── Page ─────────────────────────────────────────────────────────────────────
const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch this from an API.
  // For now, we find it in our mock data.
  const order = useMemo(() => {
    return INITIAL_ORDERS.find((o) => o.id === id);
  }, [id]);

  if (!order) {
    return (
      <ContainerDiv className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          Order Not Found
        </h2>
        <p className="text-slate-500">
          The order you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
        >
          Back to Orders
        </button>
      </ContainerDiv>
    );
  }

  return (
    <ContainerDiv className="py-10 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      {/* Navigation */}
      <OrderDetailsHeader onBack={() => navigate("/dashboard/orders")} />

      {/* Summary Section */}
      <OrderHeroSection order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <OrderAssetCard order={order} onChat={() => {}} />
          <OrderTransactionTimeline order={order} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <OrderCounterpartyCard order={order} onChat={() => {}} />
          <OrderPaymentSummary order={order} />
          <OrderSupportActions order={order} onReport={() => {}} />
        </div>
      </div>
    </ContainerDiv>
  );
};

export default OrderDetailsPage;
