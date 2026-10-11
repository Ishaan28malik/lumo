import { useQuery } from '@tanstack/react-query';

import { airportsApiUrl } from '../constants/apiUrls';
import { AirportDetails } from '../types/airport';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

export const useAirportDetails = () => {
  const handleApiError = useApiErrorHandler();

  return useQuery({
    queryKey: ['airport-details'],
    queryFn: () =>
      api.get<AirportDetails[]>(airportsApiUrl).catch(handleApiError),
  });
};
