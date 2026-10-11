import { AxiosResponse } from 'axios';

import { tripDetailsApiUrl } from '../constants/apiUrls';
import { BookingDetails } from '../types/booking';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

export const useTripDetails = () => {
  const handleApiError = useApiErrorHandler();

  return useAutoRefetchQuery<BookingDetails>({
    queryKey: ['trip-details'],
    queryFn: async () => {
      try {
        const response: AxiosResponse<BookingDetails> =
          await api.get<BookingDetails>(tripDetailsApiUrl);
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  });
};
