import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { extractApiError } from "@/lib/errors";

export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  successMessage?: string,
  errorMessage?: string,
  invalidateKeys?: QueryKey[],
  additionalOptions?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (err: unknown) => void;
  },
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,

    onSuccess: (data, variables) => {
      const message = (data as any)?.message ?? successMessage;
      if (message) toast.success(message);

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
