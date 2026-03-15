import {
  getMyProfile,
  updateMyProfile,
  getMySellerProfile,
  getPublicProfile,
} from "@/api/users";
import { useApiMutation, useApiQuery } from ".";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
  sellerProfile: () => [...userKeys.all, "sellerProfile"] as const,
  publicProfile: (id: string | number) =>
    [...userKeys.all, "publicProfile", id] as const,
};

export const useGetMyProfile = (enabled = true) => {
  return useApiQuery(
    userKeys.profile(),
    getMyProfile,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetMySellerProfile = (enabled = true) => {
  return useApiQuery(
    userKeys.sellerProfile(),
    getMySellerProfile,
    (response: any) => response?.data,
    enabled,
  );
};

export const useGetPublicProfile = (id: string | number, enabled = true) => {
  return useApiQuery(
    userKeys.publicProfile(id),
    () => getPublicProfile(id),
    (response: any) => response?.data,
    enabled,
  );
};

export const useUpdateMyProfile = () => {
  return useApiMutation(
    updateMyProfile,
    "Profile updated successfully",
    "Failed to update profile",
    [userKeys.profile()],
  );
};
