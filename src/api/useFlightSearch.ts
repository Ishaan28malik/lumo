import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { flightSearchApiUrl } from '../constants/apiUrls';
import {
  FlightSearchFilter,
  FlightSearchTableRowType,
} from '../types/flightSearchTable';
import { FlightLeg } from '../types/trip';
import { flightSearchTableDataTransformer } from '../utils/flightSearchTableDataTransformer';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

type useBookingInfoProps = {
  params: FlightSearchFilter;
  enabled?: boolean;
} & Omit<
  UseQueryOptions<
    FlightSearchTableRowType[],
    unknown,
    FlightSearchTableRowType[]
  >,
  'queryKey' | 'queryFn'
>;

function useFlightSearch({
  params,
  enabled = true,
  ...options
}: useBookingInfoProps) {
  const handleApiError = useApiErrorHandler();

  return useQuery({
    queryKey: ['flight-search', params],
    queryFn: async (): Promise<FlightSearchTableRowType[]> => {
      const response: AxiosResponse<FlightLeg[]> = await api
        .get(flightSearchApiUrl, {
          params,
        })
        .catch(handleApiError);

      return flightSearchTableDataTransformer(response.data);
    },
    enabled,
    ...options,
  });
}

export default useFlightSearch;
