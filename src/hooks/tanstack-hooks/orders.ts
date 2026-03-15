import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  confirmOrderDelivery,
  type UpdateOrderStatusPayload,
} from "@/api/orders";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  myOrders: () => [...orderKeys.lists(), "myOrders"] as const,
  ids: () => [...orderKeys.all, "detail"] as const,
  id: (id: string | number) => [...orderKeys.ids(), id] as const,
};

export const useGetMyOrders = (enabled = true) => {
  return useApiQuery(
    orderKeys.myOrders(),
    getMyOrders,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetOrderById = (id: string | number, enabled = true) => {
  return useApiQuery(
    orderKeys.id(id),
    () => getOrderById(id),
    (response: any) => response?.data,
    enabled && !!id,
  );
};

export const useCreateOrder = () => {
  return useApiMutation(
    createOrder,
    "Order created successfully",
    "Failed to create order",
    [orderKeys.lists()],
  );
};

export const useUpdateOrderStatus = () => {
  return useApiMutation(
    ({ id, data }: { id: string | number; data: UpdateOrderStatusPayload }) =>
      updateOrderStatus(id, data),
    "Order status updated successfully",
    "Failed to update order status",
    [orderKeys.all],
  );
};

export const useConfirmOrderDelivery = () => {
  return useApiMutation(
    (id: string | number) => confirmOrderDelivery(id),
    "Delivery confirmed successfully",
    "Failed to confirm delivery",
    [orderKeys.all],
  );
};
