import { useQuery } from '@tanstack/react-query';

import { summaryStatsApiUrl } from '../constants/apiUrls';
import { SummaryStats } from '../types/booking';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

type useSummaryStatsProps = {
  params: {
    org?: string;
    team?: string;
    group?: string;
  } | null;
};

export const useSummaryStats = ({ params }: useSummaryStatsProps) => {
  const handleApiError = useApiErrorHandler();
  const shouldFetch = Boolean(params && params.org && params.team);

  return useQuery({
    queryKey: shouldFetch ? ['summary-stats', { ...params }] : [],
    queryFn: () =>
      api
        .get<SummaryStats>(summaryStatsApiUrl, { params })
        .catch(handleApiError),
    enabled: shouldFetch,
  });
};
