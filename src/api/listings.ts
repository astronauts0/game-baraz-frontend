import apiRequest from "@/config/apiRequest";
import api from "@/config/axios";
import { API_ENDPOINTS } from "@/config/endpoints/apiEndpoints";

export interface CreateListingPayload {
  game: string;
  title: string;
  description?: string;
  cover_image?: string;
  price: number;
  allow_counter_offer?: boolean;
  minimum_counter_offer?: number;
  instant_delivery?: boolean;
  account_details_encrypted_ref?: string;
}

export interface UpdateListingPayload extends Partial<CreateListingPayload> {
  status?: "active" | "disabled" | "sold";
}

export interface ListingFilter {
  game?: string;
  status?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  limit?: number;
}

export const getListings = async (filters?: ListingFilter) => {
  return apiRequest(() => api.get(API_ENDPOINTS.LISTINGS, { params: filters }));
};

export const getListingById = async (id: string | number) => {
  return apiRequest(() => api.get(API_ENDPOINTS.LISTING_BY_ID(id)));
};

export const createListing = async (data: CreateListingPayload) => {
  return apiRequest(() => api.post(API_ENDPOINTS.LISTINGS, data));
};

export const updateListing = async (
  id: string | number,
  data: UpdateListingPayload,
) => {
  return apiRequest(() => api.patch(API_ENDPOINTS.LISTING_BY_ID(id), data));
};

export const deleteListing = async (id: string | number) => {
  return apiRequest(() => api.delete(API_ENDPOINTS.LISTING_BY_ID(id)));
};

export const getMyListings = async () => {
  return apiRequest(() => api.get(API_ENDPOINTS.MY_LISTINGS));
};
