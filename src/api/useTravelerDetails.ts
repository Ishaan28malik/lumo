import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

import { travelerDetailsApiUrl } from '../constants/apiUrls';
import { BookingDetails } from '../types/booking';
import { TripTableRowType } from '../types/tripsTableRowType';
import bookingDataTransformer from '../utils/homePageTripTableDataTransformer';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

function useTravelerDetails({ id }: { id: string }) {
  const handleApiError = useApiErrorHandler();

  return useAutoRefetchQuery<BookingDetails[], unknown, TripTableRowType[]>({
    queryKey: ['traveler-info', id],
    queryFn: async (): Promise<AxiosResponse<BookingDetails[]>> => {
      try {
        const response = await api.get<BookingDetails[]>(
          `${travelerDetailsApiUrl}/${id}`
        );
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    select: useCallback((response: AxiosResponse<BookingDetails[]>) => {
      return bookingDataTransformer(response);
    }, []),
  });
}

export default useTravelerDetails;
