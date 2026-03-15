import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface WithdrawalAccountDetails {
  account_name: string;
  account_number: string;
  bank_name?: string;
}

export interface RequestWithdrawalPayload {
  amount: number;
  method: "easypaisa" | "jazzcash" | "bank";
  account_details: WithdrawalAccountDetails;
}

export const getMyWallet = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.WALLET));
};

export const getWalletTransactions = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.WALLET_TRANSACTIONS));
};

export const requestWithdrawal = async (data: RequestWithdrawalPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.WALLET_WITHDRAW, data));
};

export const getMyWithdrawals = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.WALLET_WITHDRAWALS));
};
