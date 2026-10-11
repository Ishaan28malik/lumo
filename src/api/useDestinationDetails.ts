import { useQuery } from '@tanstack/react-query';

import { destinationApiUrl } from '../constants/apiUrls';
import { DestinationDetails } from '../types/destination';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

export const useDestinationDetails = () => {
  const handleApiError = useApiErrorHandler();

  return useQuery({
    queryKey: ['destination-details'],
    queryFn: () =>
      api.get<DestinationDetails[]>(destinationApiUrl).catch(handleApiError),
  });
};
