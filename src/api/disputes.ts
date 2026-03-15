import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface RaiseDisputePayload {
  order_id: string;
  raised_by: "seller" | "buyer";
  reason: string;
  proof_urls?: string[];
}

export interface ResolveDisputePayload {
  final_outcome: "refund_buyer" | "pay_seller" | "partial";
  admin_notes?: string;
  status?: "in_review" | "in_discussion" | "resolved";
}

export const raiseDispute = async (data: RaiseDisputePayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.DISPUTES, data));
};

export const getMyDisputes = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.MY_DISPUTES));
};

export const getDisputeByOrder = async (orderId: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.DISPUTE_BY_ORDER(orderId)));
};

// Admin only
export const getAllDisputes = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.DISPUTES_ALL));
};

// Admin only
export const resolveDispute = async (
  id: string | number,
  data: ResolveDisputePayload,
) => {
  return apiRequest(() => api.patch(API_ENDPOINTS.RESOLVE_DISPUTE(id), data));
};
