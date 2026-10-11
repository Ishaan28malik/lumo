import { useQuery } from '@tanstack/react-query';

import { userInfoApiUrl } from '../constants/apiUrls';
import { UserInfo } from '../types/user-info';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

export const useUserInfo = () => {
  const handleApiError = useApiErrorHandler();

  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => api.get<UserInfo>(userInfoApiUrl).catch(handleApiError),
  });
};
