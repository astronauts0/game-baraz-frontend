import {
  raiseDispute,
  getMyDisputes,
  getDisputeByOrder,
  getAllDisputes,
  resolveDispute,
  type ResolveDisputePayload,
} from "@/api/disputes";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const disputeKeys = {
  all: ["disputes"] as const,
  lists: () => [...disputeKeys.all, "list"] as const,
  myDisputes: () => [...disputeKeys.lists(), "myDisputes"] as const,
  allDisputes: () => [...disputeKeys.lists(), "allDisputes"] as const, // Admin
  byOrder: (orderId: string | number) =>
    [...disputeKeys.all, "byOrder", orderId] as const,
};

export const useGetMyDisputes = (enabled = true) => {
  return useApiQuery(
    disputeKeys.myDisputes(),
    getMyDisputes,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetDisputeByOrder = (
  orderId: string | number,
  enabled = true,
) => {
  return useApiQuery(
    disputeKeys.byOrder(orderId),
    () => getDisputeByOrder(orderId),
    (response: any) => response?.data,
    enabled && !!orderId,
  );
};

// Admin only
export const useGetAllDisputes = (enabled = false) => {
  return useApiQuery(
    disputeKeys.allDisputes(),
    getAllDisputes,
    (response: any) => response?.data,
    enabled,
  );
};

export const useRaiseDispute = () => {
  return useApiMutation(
    raiseDispute,
    "Dispute has been raised successfully",
    "Failed to raise dispute",
    [disputeKeys.lists(), disputeKeys.all],
  );
};

// Admin only
export const useResolveDispute = () => {
  return useApiMutation(
    ({ id, data }: { id: string | number; data: ResolveDisputePayload }) =>
      resolveDispute(id, data),
    "Dispute resolved successfully",
    "Failed to resolve dispute",
    [disputeKeys.all],
  );
};
