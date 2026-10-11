import {
  Query,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UseAutoRefetchQueryProps<
  TData,
  TError = unknown,
  TSelectedData = TData,
> extends UseQueryOptions<AxiosResponse<TData>, TError, TSelectedData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<AxiosResponse<TData>>;
  refetchInterval?:
    | number
    | false
    | ((
        query: Query<
          AxiosResponse<TData>,
          TError,
          AxiosResponse<TData>,
          QueryKey
        >
      ) => number | false);
  select?: (data: AxiosResponse<TData>) => TSelectedData;
}
function useAutoRefetchQuery<TData, TError = unknown, TSelectedData = TData>({
  queryKey,
  queryFn,
  refetchInterval = 60000, // Default to 1 minute
  select,
  ...options
}: UseAutoRefetchQueryProps<TData, TError, TSelectedData>) {
  const safeRefetchInterval =
    typeof refetchInterval === 'function'
      ? (
          query: Query<
            AxiosResponse<TData>,
            TError,
            AxiosResponse<TData>,
            QueryKey
          >
        ) => {
          const result = refetchInterval(query);
          return result === undefined ? false : result;
        }
      : refetchInterval;
  return useQuery<AxiosResponse<TData>, TError, TSelectedData>({
    queryKey,
    queryFn,
    refetchInterval: safeRefetchInterval,
    select,
    ...options,
  });
}
export default useAutoRefetchQuery;
