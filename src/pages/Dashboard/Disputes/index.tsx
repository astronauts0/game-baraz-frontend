import React, { useState, useEffect } from "react";
import type { Dispute } from "@/types";
import { DisputesSidebar } from "./components/DisputesSidebar";
import { DisputeChatArea } from "./components/DisputeChatArea";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionTop from "@/components/global/SectionTop";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockDisputes } from "@/data/mockData";

interface DisputesPageProps {
  disputes?: Dispute[];
  onSendMessage?: (disputeId: string, text: string) => void;
}

const DisputesPage: React.FC<DisputesPageProps> = ({
  disputes = mockDisputes,
  onSendMessage,
}) => {
  const safeDisputes = Array.isArray(disputes) ? disputes : [];
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(
    safeDisputes.length > 0 ? safeDisputes[0].id : null,
  );

  const navigate = useNavigate();

  // Auto-select first dispute if selection becomes invalid due to updates
  useEffect(() => {
    if (!selectedDisputeId && safeDisputes.length > 0) {
      setSelectedDisputeId(safeDisputes[0].id);
    }
  }, [safeDisputes, selectedDisputeId]);

  const selectedDispute = safeDisputes.find((d) => d.id === selectedDisputeId);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ContainerDiv className="py-10 sm:py-20 space-y-6">
      {/* Header */}

      <SectionTop
        title="Dispute Resolution Center"
        description={`Manage your active cases. Currently viewing ${selectedDispute?.orderId ? `Order #${selectedDispute.orderId}` : "Dashboard"}`}
      >
        <Button variant="outline" onClick={handleCancel}>
          <ChevronLeft size={20} />
          Back
        </Button>
      </SectionTop>

      <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
        <DisputesSidebar
          disputes={safeDisputes}
          selectedDisputeId={selectedDisputeId}
          onSelectDispute={setSelectedDisputeId}
        />
        <DisputeChatArea
          dispute={selectedDispute}
          onSendMessage={onSendMessage || ((_id, _text) => {})}
        />
      </div>
    </ContainerDiv>
  );
};

export default DisputesPage;
