import React from "react";
import { HelpCircle } from "lucide-react";

export const DisputeGuideCard: React.FC = () => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
      <div className="flex gap-3">
        <HelpCircle size={20} className="text-primary shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-primary">How Disputes Work</h4>
          <ol className="text-xs text-primary/80 mt-2 space-y-2 list-decimal pl-3">
            <li>Your claim is logged and the seller is notified.</li>
            <li>The seller has 24 hours to respond with their evidence.</li>
            <li>An admin reviews all evidence and makes a final decision.</li>
            <li>Funds are released to the winner of the dispute.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
