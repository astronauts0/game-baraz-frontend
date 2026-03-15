import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface CreateReviewPayload {
  order_id: string;
  reviewee_id: string;
  rating: number; // 0 to 5
  comment?: string;
}

export const createReview = async (data: CreateReviewPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.REVIEWS, data));
};

export const getReviewsByUser = async (userId: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.REVIEWS_BY_USER(userId)));
};

export const getReviewByOrder = async (orderId: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.REVIEWS_BY_ORDER(orderId)));
};
