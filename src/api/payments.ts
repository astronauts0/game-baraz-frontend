import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface InitiatePaymentPayload {
  order_id: string;
  method: "easypaisa" | "jazzcash" | "bank";
  meta_data?: Record<string, any>;
}

export const initiatePayment = async (data: InitiatePaymentPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.PAYMENTS, data));
};

export const getPaymentByOrder = async (orderId: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.PAYMENT_BY_ORDER(orderId)));
};
