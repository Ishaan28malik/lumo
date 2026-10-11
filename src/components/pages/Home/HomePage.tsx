import { FC, useMemo } from 'react';

import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import useSummaryStatsData from '../../../hooks/useSummaryStatsData';
import SummaryStatsCard from '../../common/SummaryStats/SummaryStatsCard';
import SummaryStatsTable from '../../common/SummaryStats/SummaryStatsTable';
import TripTable from '../../common/TripTable';

const HomePage: FC = () => {
  const { summaryStatsData, isLoading } = useSummaryStatsData();

  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  // ToDo remove this once actual API comes
  const summaryStatsArray = useMemo(() => {
    if (
      selectedOrg === '.apple.inc' &&
      selectedTeam === 'fa2f9d1e-2218-4107-bfd3-d1e8dd5ee091'
    ) {
      return [];
    }
    if (!summaryStatsData) return [];

    return [summaryStatsData];
  }, [summaryStatsData, selectedOrg, selectedTeam]);

  return (
    <div className="tw-text-center">
      <div className="tw-mb-5">
        {summaryStatsArray && (
          <div className="tw-justify tw-flex tw-gap-4">
            <SummaryStatsCard
              summaryStatsData={summaryStatsArray}
              isLoading={isLoading}
            />
            <SummaryStatsTable />
          </div>
        )}
      </div>
      <TripTable tableName="Trips" />
    </div>
  );
};

export default HomePage;
