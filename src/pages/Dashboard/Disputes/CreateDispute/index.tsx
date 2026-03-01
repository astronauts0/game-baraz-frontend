import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Order } from "@/types";
import { INITIAL_ORDERS } from "@/constants";
import { Button } from "@/components/ui/button";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { CreateDisputeForm } from "./components/CreateDisputeForm";
import { OrderContextCard } from "./components/OrderContextCard";
import { DisputeGuideCard } from "./components/DisputeGuideCard";
import SectionTop from "@/components/global/SectionTop";

interface CreateDisputeProps {
  order?: Order;
  onSubmit?: (data: {
    reason: string;
    description: string;
    files: File[];
  }) => void;
  onCancel?: () => void;
}

const CreateDispute: React.FC<CreateDisputeProps> = ({
  order: propOrder,
  onSubmit: propOnSubmit,
  onCancel: propOnCancel,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // If order is not provided via props, try to get it from location state or fallback to a dummy order
  const order = propOrder || location.state?.order || INITIAL_ORDERS[0];

  const handleCancel = () => {
    if (propOnCancel) {
      propOnCancel();
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (data: {
    reason: string;
    description: string;
    files: File[];
  }) => {
    if (propOnSubmit) {
      propOnSubmit(data);
    } else {
      console.log("Dispute submitted:", data);
      navigate("/dashboard/orders");
    }
  };

  if (!order) {
    return (
      <ContainerDiv className="py-20 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </ContainerDiv>
    );
  }

  return (
    <ContainerDiv className="py-10 sm:py-20 space-y-6">
      {/* Header */}

      <SectionTop
        title="Open New Dispute"
        description="Submit a formal claim regarding Order #{order.id}"
      >
        <Button variant="outline" onClick={handleCancel}>
          <ChevronLeft size={20} />
          Back
        </Button>
      </SectionTop>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <CreateDisputeForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>

        {/* Right Column: Order Context */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <OrderContextCard order={order} />
            <DisputeGuideCard />
          </div>
        </div>
      </div>
    </ContainerDiv>
  );
};

export default CreateDispute;
