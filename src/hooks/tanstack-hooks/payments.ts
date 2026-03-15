import { initiatePayment, getPaymentByOrder } from "@/api/payments";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const paymentKeys = {
  all: ["payments"] as const,
  byOrder: (orderId: string | number) =>
    [...paymentKeys.all, "byOrder", orderId] as const,
};

export const useGetPaymentByOrder = (
  orderId: string | number,
  enabled = true,
) => {
  return useApiQuery(
    paymentKeys.byOrder(orderId),
    () => getPaymentByOrder(orderId),
    (response: any) => response?.data,
    enabled && !!orderId,
  );
};

export const useInitiatePayment = () => {
  return useApiMutation(
    initiatePayment,
    "Payment initiated successfully",
    "Failed to initiate payment",
    [paymentKeys.all],
    { showSuccessToast: false }, // Oftentimes redirecting, so toast might not be needed
  );
};
