import { AxiosResponse } from 'axios';

import { flightDetailsApiUrl } from '../constants/apiUrls';
import useAutoRefetchQuery from '../utils/useAutoRefreshQuery';
import api from './api';

export const useTravelAdvisory = ({ id }: { id: string }) =>
  useAutoRefetchQuery<AxiosResponse>({
    queryKey: ['flight-details', id],
    queryFn: async () => {
      const response: AxiosResponse = await api.get(
        `${flightDetailsApiUrl}/${id}`
      );
      return response;
    },
  });
