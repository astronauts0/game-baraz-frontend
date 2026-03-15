import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
  type ListingFilter,
  type UpdateListingPayload,
} from "@/api/listings";
import { useApiMutation, useApiQuery, useApiInfiniteQuery } from ".";

// Query Keys
export const listingKeys = {
  all: ["listings"] as const,
  lists: () => [...listingKeys.all, "list"] as const,
  list: (filters: ListingFilter = {}) =>
    [...listingKeys.lists(), filters] as const,
  ids: () => [...listingKeys.all, "detail"] as const,
  id: (id: string | number) => [...listingKeys.ids(), id] as const,
  myListings: () => [...listingKeys.all, "myListings"] as const,
};

export const useGetListings = (filters: ListingFilter = {}) => {
  return useApiInfiniteQuery(listingKeys.list(filters), ({ pageParam }) =>
    getListings({ ...filters, page: pageParam }),
  );
};

export const useGetListingById = (id: string | number, enabled = true) => {
  return useApiQuery(
    listingKeys.id(id),
    () => getListingById(id),
    (response: any) => response?.data,
    enabled && !!id,
  );
};

export const useGetMyListings = (enabled = true) => {
  return useApiQuery(
    listingKeys.myListings(),
    getMyListings,
    (response: any) => response?.data,
    enabled,
  );
};

export const useCreateListing = () => {
  return useApiMutation(
    createListing,
    "Listing created successfully",
    "Failed to create listing",
    [listingKeys.lists(), listingKeys.myListings()],
  );
};

export const useUpdateListing = () => {
  return useApiMutation(
    ({ id, data }: { id: string | number; data: UpdateListingPayload }) =>
      updateListing(id, data),
    "Listing updated successfully",
    "Failed to update listing",
    [listingKeys.all],
  );
};

export const useDeleteListing = () => {
  return useApiMutation(
    deleteListing,
    "Listing deleted successfully",
    "Failed to delete listing",
    [listingKeys.lists(), listingKeys.myListings()],
  );
};
