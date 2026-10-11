import { AgGridReact } from 'ag-grid-react';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import useGroupDetails from '../../../api/useGroupDetails';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import useSummaryStatsData from '../../../hooks/useSummaryStatsData';
import GroupMarkdownCard from '../../common/GroupDetails/GroupMarkdownCard';
import { GroupTableColumns } from '../../common/GroupDetails/GroupTableColumns';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import LumoAgGrid from '../../common/LumoAgGrid/Index';
import SummaryStatsCard from '../../common/SummaryStats/SummaryStatsCard';
import {
  DownloadButton,
  TableInputData,
} from '../../common/downloads/DownloadAgGridData';

type GroupDetailsPageProps = {
  minHeight?: number;
  maxHeight?: number;
};

const GroupDetailPage: React.FC<GroupDetailsPageProps> = ({
  minHeight = 290,
  maxHeight = 700,
}) => {
  const { id: groupId } = useParams();
  const { data, isLoading } = useGroupDetails({ id: groupId! });

  // Set page title
  const title = 'Group';
  const displayName = data?.[0]?.group?.description;
  useSetPageTitle({ title, displayName });

  // Fetch summary stats data
  const { summaryStatsData, isLoading: isStatsLoading } = useSummaryStatsData();

  const summaryStatsArray = useMemo(() => {
    if (!summaryStatsData) return [];
    return [summaryStatsData];
  }, [summaryStatsData]);

  const gridRef = useRef<AgGridReact>(null);

  const dynamicTableName = `Trips-${title}-${groupId}`;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <div>
        <div className="tw-mb-5 tw-flex tw-w-full tw-gap-4">
          {summaryStatsArray && (
            <SummaryStatsCard
              summaryStatsData={summaryStatsArray}
              isLoading={isStatsLoading}
            />
          )}
          <GroupMarkdownCard content="" />
        </div>

        <div className="tw-rounded-md tw-border">
          <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-px-5 tw-py-2">
            <h3 className="tw-text-left tw-text-lg tw-font-medium">Trips</h3>
            <DownloadButton
              gridRef={gridRef}
              tableName={dynamicTableName}
              data={data as TableInputData[]}
            />
          </div>
          <div className="tw-p-5">
            <LumoAgGrid
              columns={GroupTableColumns}
              rows={data!}
              minHeight={minHeight}
              maxHeight={maxHeight}
              gridRef={gridRef}
            />
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default GroupDetailPage;
