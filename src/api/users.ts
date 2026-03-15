import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface UpdateProfilePayload {
  name?: string;
  about?: string;
  // File uploads conceptually happen here too (avatar)
}

export const getMyProfile = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.MY_PROFILE));
};

export const updateMyProfile = async (data: UpdateProfilePayload) => {
  return apiRequest(() => api.patch(API_ENDPOINTS.MY_PROFILE, data));
};

export const getMySellerProfile = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.MY_SELLER_PROFILE));
};

export const getPublicProfile = async (id: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.USER_PROFILE(id)));
};
