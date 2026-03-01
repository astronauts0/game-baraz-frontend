import React, { useState } from "react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import AlertPrimary from "@/components/shared/Alert/AlertPrimary";

interface WalletBalanceCardProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  setBalance,
  setTransactions,
}) => {
  const navigate = useNavigate();
  const [transactionModalOpen, setTransactionModalOpen] = useState<
    "deposit" | "withdraw" | null
  >(null);
  const [amountInput, setAmountInput] = useState("");

  const isWithdrawal = transactionModalOpen === "withdraw";
  const amountVal = Number(amountInput);
  const isInsufficient = isWithdrawal && amountVal > balance;

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountVal || amountVal <= 0) return;

    if (isWithdrawal && amountVal > balance) {
      return;
    }

    const newTx: Transaction = {
      id: `TX-${Math.floor(Math.random() * 10000)}`,
      type: transactionModalOpen === "deposit" ? "Deposit" : "Withdrawal",
      label:
        transactionModalOpen === "deposit"
          ? "Manual Deposit"
          : "Manual Withdrawal",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: transactionModalOpen === "deposit" ? amountVal : -amountVal,
      status: "Completed",
    };

    setBalance((prev) =>
      transactionModalOpen === "deposit" ? prev + amountVal : prev - amountVal,
    );
    setTransactions((prev) => [newTx, ...prev]);
    setTransactionModalOpen(null);
    setAmountInput("");
  };

  return (
    <>
      <div className="space-y-6">
        {/* Main Digital Card */}
        <div className="relative h-56 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl text-white overflow-hidden group transition-all hover:shadow-2xl hover:scale-[1.01]">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <Wallet size={24} className="text-primary" />
              </div>
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                GameBazaar Secure
              </span>
            </div>

            <div>
              <p className="text-sm text-white font-medium mb-1">
                Total Available Balance
              </p>
              <h2 className="text-4xl font-bold tracking-tight">
                Rs {balance.toLocaleString()}
              </h2>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-400">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">ID: GB-8821-XP</p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTransactionModalOpen("deposit")}
            className="cursor-copy flex flex-col items-center justify-center gap-2 p-6 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-lg shadow-purple-200 transition-all transform active:scale-95 group"
          >
            <div className="p-2 bg-white rounded-full group-hover:scale-110 transition-transform">
              <ArrowDownLeft size={20} className="text-primary" />
            </div>
            <span className="font-bold text-sm">Deposit</span>
          </button>
          <button
            onClick={() => setTransactionModalOpen("withdraw")}
            className="cursor-copy flex flex-col items-center justify-center gap-2 p-6 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition-all transform active:scale-95 group"
          >
            <div className="p-2 bg-black rounded-full group-hover:scale-110 transition-transform">
              <ArrowUpRight size={20} className="text-white" />
            </div>
            <span className="font-bold text-sm">Withdraw</span>
          </button>
        </div>

        {/* Pending / Held Balance */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                In Escrow
              </p>
              <p className="text-lg font-bold text-amber-900">Rs 12,500.00</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
          >
            View Orders
          </button>
        </div>
      </div>

      <ModalPrimary
        isOpen={!!transactionModalOpen}
        onClose={() => {
          setTransactionModalOpen(null);
          setAmountInput("");
        }}
        title={
          transactionModalOpen === "deposit" ? "Add Funds" : "Withdraw Funds"
        }
      >
        <form onSubmit={handleTransaction} className="space-y-6">
          <div className="text-center">
            <p className="text-slate-500 text-sm mb-1">Current Balance</p>
            <h3 className="text-3xl font-bold">
              Rs {balance.toLocaleString()}
            </h3>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Amount</label>
            <div className="relative">
              <span
                className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${
                  isInsufficient ? "text-red-600" : "text-slate-400"
                }`}
              >
                Rs
              </span>
              <Input
                type="number"
                min="1"
                required
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className={`pl-10 text-lg font-bold h-12 ${
                  isInsufficient
                    ? "text-red-600 border-red-300 focus:ring-red-200"
                    : ""
                }`}
                placeholder="0.00"
              />
            </div>
            {isInsufficient && (
              <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1 justify-center animate-in fade-in slide-in-from-top-1">
                <AlertTriangle size={12} />
                Insufficient funds. Max withdrawal is Rs{" "}
                {balance.toLocaleString()}
              </p>
            )}
          </div>

          {transactionModalOpen === "withdraw" && (
            <AlertPrimary
              title="Withdrawal Information"
              description="Withdrawals typically take 1-3 business days to process depending on your bank."
              icon={<ShieldCheck size={20} className="text-amber-800" />}
              className="bg-amber-50 border border-amber-100"
              titleClassName="text-amber-800"
              descriptionClassName="text-amber-700"
            />
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isInsufficient || !amountVal}
          >
            {transactionModalOpen === "deposit"
              ? "Confirm Deposit"
              : "Request Withdrawal"}
          </Button>
        </form>
      </ModalPrimary>
    </>
  );
};
