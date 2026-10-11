import { useQuery } from '@tanstack/react-query';

import { airlinesApiUrl } from '../constants/apiUrls';
import { AirlinesDetails } from '../types/airlines';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

export const useAirlinesDetails = () => {
  const handleApiError = useApiErrorHandler();

  return useQuery({
    queryKey: ['airlines-details'],
    queryFn: () =>
      api.get<AirlinesDetails[]>(airlinesApiUrl).catch(handleApiError),
  });
};
