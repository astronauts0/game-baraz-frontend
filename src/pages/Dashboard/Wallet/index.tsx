import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { Button } from "@/components/ui/button";

import type { Transaction, PaymentMethod } from "@/types";
import { INITIAL_TRANSACTIONS, INITIAL_METHODS } from "@/data/mockData";
import { WalletBalanceCard } from "./components/WalletBalanceCard";
import { WalletPaymentMethods } from "./components/WalletPaymentMethods";
import { WalletActivityTimeline } from "./components/WalletActivityTimeline";
import SectionTop from "@/components/global/SectionTop";

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(48250);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(INITIAL_METHODS);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadStatement = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Statement for October 2023 has been downloaded successfully.");
    }, 2000);
  };

  return (
    <ContainerDiv className="py-10 sm:py-20 space-y-8">
      {/* Page Title */}

      <SectionTop
        title="Operative Wallet"
        description="Manage your funds, payouts, and payment methods."
      >
        <Button onClick={handleDownloadStatement} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {isDownloading ? "Generating PDF..." : "Download Statement"}
        </Button>
      </SectionTop>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cards & Actions */}
        <div className="lg:col-span-1">
          <WalletBalanceCard
            balance={balance}
            setBalance={setBalance}
            setTransactions={setTransactions}
          />
        </div>

        {/* Middle & Right: Transaction History & Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Methods */}
          <WalletPaymentMethods
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
          />

          {/* Recent Activity */}
          <WalletActivityTimeline transactions={transactions} />
        </div>
      </div>
    </ContainerDiv>
  );
};

export default WalletPage;
