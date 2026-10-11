import { AxiosResponse } from 'axios';
import { useCallback } from 'react';

import { bookingInfoApiUrl } from '../constants/apiUrls';
import { BookingDetails } from '../types/booking';
import { TripTableRowType } from '../types/tripsTableRowType';
import bookingDataTransformer from '../utils/homePageTripTableDataTransformer';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

type useBookingInfoProps = {
  params: {
    org: string;
    team: string;
    delay?: number;
    risk?: number;
    horizon?: number;
    flightid?: string;
  };
};

function useBookingInfo({ params }: useBookingInfoProps) {
  const handleApiError = useApiErrorHandler();
  const shouldFetch = Boolean(params.org && params.team);

  return useAutoRefetchQuery<BookingDetails[], unknown, TripTableRowType[]>({
    queryKey: shouldFetch ? ['booking-info', { ...params }] : [],
    queryFn: async (): Promise<AxiosResponse<BookingDetails[]>> => {
      if (!shouldFetch) {
        throw new Error("Missing 'org' or 'team' in parameters.");
      }

      try {
        const response = await api.get<BookingDetails[]>(bookingInfoApiUrl, {
          params,
        });
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    select: useCallback((response: AxiosResponse<BookingDetails[]>) => {
      return bookingDataTransformer(response);
    }, []),
    enabled: shouldFetch,
  });
}

export default useBookingInfo;
