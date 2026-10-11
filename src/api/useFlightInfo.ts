import { AxiosResponse } from 'axios';

import { flightDetailsApiUrl } from '../constants/apiUrls';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

export const useFlightInfo = ({ id }: { id: string }) => {
  const handleApiError = useApiErrorHandler();

  return useAutoRefetchQuery<AxiosResponse>({
    queryKey: ['flight-details', id],
    queryFn: async () => {
      try {
        const response: AxiosResponse = await api.get(
          `${flightDetailsApiUrl}/${id}`
        );
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  });
};
