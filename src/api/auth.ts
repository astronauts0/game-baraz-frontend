import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  contact_number: string;
  password: string;
  about?: string;
}

export const login = async (data: LoginPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.AUTH_LOGIN, data));
};

export const register = async (data: RegisterPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.AUTH_REGISTER, data));
};
