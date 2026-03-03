import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export const login = async (data: any) => {
  return apiRequest(() => api.post(API_ENDPOINTS.USER_LOGIN, data));
};

export const getUser = async () => {
  return apiRequest(() => api(API_ENDPOINTS.USER));
};
