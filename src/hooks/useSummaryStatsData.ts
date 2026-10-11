import { useMemo } from 'react';

import { useSummaryStats } from '../api/useSummaryStats';
import { useTeamOrgContext } from '../context/useTeamOrgContext';

const useSummaryStatsData = () => {
  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  const params = useMemo(
    () => ({
      org: selectedOrg,
      team: selectedTeam,
    }),
    [selectedOrg, selectedTeam]
  );

  const { data, isLoading } = useSummaryStats({ params });

  const summaryStatsData = Array.isArray(data?.data)
    ? data?.data[0]?.org
    : undefined;

  return { summaryStatsData, isLoading };
};

export default useSummaryStatsData;
