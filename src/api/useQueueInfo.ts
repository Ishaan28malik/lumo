import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

import { queuesDetailsApiUrl } from '../constants/apiUrls';
import { QueueDetails, useQueueInfoProps } from '../types/queue';
import { TripTableRowType } from '../types/tripsTableRowType';
import queueDataTransformer from '../utils/queueDataTransformer';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

function useQueueInfo({ params }: useQueueInfoProps) {
  const handleApiError = useApiErrorHandler();
  const shouldFetch = Boolean(params?.org && params?.team);

  return useAutoRefetchQuery<QueueDetails[], unknown, TripTableRowType[]>({
    queryKey: shouldFetch ? ['queue-info', { ...params }] : [],
    queryFn: async (): Promise<AxiosResponse<QueueDetails[]>> => {
      if (!shouldFetch) {
        throw new Error("Missing 'org' or 'team' in parameters.");
      }

      try {
        const response = await api.get<QueueDetails[]>(queuesDetailsApiUrl, {
          params,
        });
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    select: useCallback((response: AxiosResponse<QueueDetails[]>) => {
      return queueDataTransformer(response);
    }, []),
    enabled: shouldFetch,
  });
}

export default useQueueInfo;
