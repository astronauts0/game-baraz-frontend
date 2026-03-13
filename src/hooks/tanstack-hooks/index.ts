import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { extractApiError } from "@/lib/errors";

export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  successMessage?: string,
  errorMessage?: string,
  invalidateKeys?: QueryKey[],
  additionalOptions?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (err: unknown) => void;
    showSuccessToast?: boolean;
  },
) => {
  const queryClient = useQueryClient();
  const showToast = additionalOptions?.showSuccessToast ?? true;

  return useMutation<TData, unknown, TVariables>({
    mutationFn,

    onSuccess: (data, variables) => {
      const message = (data as any)?.message ?? successMessage;
      if (message && showToast) toast.success(message);

      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      additionalOptions?.onSuccess?.(data, variables);
    },

    onError: (err) => {
      const message = extractApiError(
        err,
        errorMessage ?? "Something went wrong",
      );
      console.error(`[Mutation Error]:`, err);
      toast.error(message);

      additionalOptions?.onError?.(err);
    },
  });
};

export const useApiQuery = <TData, TSelected = TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  select?: (data: TData) => TSelected,
  enabled?: boolean,
  staleTime?: number,
) => {
  return useQuery<TData, Error, TSelected>({
    queryKey,
    queryFn,
    select,
    enabled,
    staleTime,
  });
};

export const useApiInfiniteQuery = <TData>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<TData>,
  enabled?: boolean,
  staleTime?: number,
) => {
  return useInfiniteQuery<TData, Error>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      const { pagination } = lastPage;
      if (pagination && pagination.currentPage < pagination.totalPages) {
        return pagination.currentPage + 1;
      }
      return undefined;
    },
    enabled,
    staleTime,
  });
};
