import {
  getMyWallet,
  getWalletTransactions,
  requestWithdrawal,
  getMyWithdrawals,
} from "@/api/wallet";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const walletKeys = {
  all: ["wallet"] as const,
  balance: () => [...walletKeys.all, "balance"] as const,
  transactions: () => [...walletKeys.all, "transactions"] as const,
  withdrawals: () => [...walletKeys.all, "withdrawals"] as const,
};

export const useGetMyWallet = (enabled = true) => {
  return useApiQuery(
    walletKeys.balance(),
    getMyWallet,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetWalletTransactions = (enabled = true) => {
  return useApiQuery(
    walletKeys.transactions(),
    getWalletTransactions,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetMyWithdrawals = (enabled = true) => {
  return useApiQuery(
    walletKeys.withdrawals(),
    getMyWithdrawals,
    (response: any) => response?.data,
    enabled,
  );
};

export const useRequestWithdrawal = () => {
  return useApiMutation(
    requestWithdrawal,
    "Withdrawal requested successfully",
    "Failed to request withdrawal",
    [walletKeys.withdrawals(), walletKeys.balance()],
  );
};
