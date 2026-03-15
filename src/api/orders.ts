import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface CreateOrderPayload {
  listing_id: string;
  delivery_method?: "chat" | "auto";
  transaction_trigger_method?: "buyer_confirmed" | "auto";
}

export interface UpdateOrderStatusPayload {
  status: "payment_pending" | "paid" | "buyer_confirmed" | "completed";
}

export const createOrder = async (data: CreateOrderPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.ORDERS, data));
};

export const getMyOrders = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.MY_ORDERS));
};

export const getOrderById = async (id: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.ORDER_BY_ID(id)));
};

export const updateOrderStatus = async (
  id: string | number,
  data: UpdateOrderStatusPayload,
) => {
  return apiRequest(() => api.patch(API_ENDPOINTS.ORDER_STATUS(id), data));
};

export const confirmOrderDelivery = async (id: string | number) => {
  return apiRequest(() => api.patch(API_ENDPOINTS.ORDER_CONFIRM(id)));
};
