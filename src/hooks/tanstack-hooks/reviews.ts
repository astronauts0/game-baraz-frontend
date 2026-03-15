import {
  createReview,
  getReviewsByUser,
  getReviewByOrder,
} from "@/api/reviews";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const reviewKeys = {
  all: ["reviews"] as const,
  byUser: (userId: string | number) =>
    [...reviewKeys.all, "byUser", userId] as const,
  byOrder: (orderId: string | number) =>
    [...reviewKeys.all, "byOrder", orderId] as const,
};

export const useGetReviewsByUser = (
  userId: string | number,
  enabled = true,
) => {
  return useApiQuery(
    reviewKeys.byUser(userId),
    () => getReviewsByUser(userId),
    (response: any) => response?.data,
    enabled && !!userId,
  );
};

export const useGetReviewByOrder = (
  orderId: string | number,
  enabled = true,
) => {
  return useApiQuery(
    reviewKeys.byOrder(orderId),
    () => getReviewByOrder(orderId),
    (response: any) => response?.data,
    enabled && !!orderId,
  );
};

export const useCreateReview = () => {
  return useApiMutation(
    createReview,
    "Review submitted successfully",
    "Failed to submit review",
    [reviewKeys.all],
  );
};
