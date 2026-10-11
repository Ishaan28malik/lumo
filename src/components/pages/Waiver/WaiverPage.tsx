import { AgGridReact } from 'ag-grid-react';
import { useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useWaiverInfo from '../../../api/useWaiverInfo';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import useSummaryStatsData from '../../../hooks/useSummaryStatsData';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import LumoAgGrid from '../../common/LumoAgGrid/Index';
import SummaryStatsCard from '../../common/SummaryStats/SummaryStatsCard';
import WaiverMarkdownCard from '../../common/Waiver/WaiverMarkdownCard';
import { WaiverTableColumns } from '../../common/Waiver/WaiverTableColumns';
import {
  DownloadButton,
  TableInputData,
} from '../../common/downloads/DownloadAgGridData';

type WaiverPageProps = {
  minHeight?: number;
  maxHeight?: number;
};

const WaiverPage: React.FC<WaiverPageProps> = ({
  minHeight = 210,
  maxHeight = 500,
}) => {
  const { id: eventId } = useParams();
  const { data, isLoading } = useWaiverInfo({ id: eventId! });

  const location = useLocation();
  const row = location.state?.row;

  const { summaryStatsData, isLoading: isStatsLoading } = useSummaryStatsData();

  const title = 'Waiver';
  const displayName = row?.advisory || 'Waiver Details';
  useSetPageTitle({ title, displayName });

  const summaryStatsArray = useMemo(() => {
    if (!summaryStatsData) return [];
    return [summaryStatsData];
  }, [summaryStatsData]);

  const gridRef = useRef<AgGridReact>(null);
  const dynamicTableName = `Trips-${title}-${eventId}`;
  return (
    <LoadingWrapper isLoading={isLoading}>
      <div>
        <div className="tw-mt-[20px] tw-flex tw-w-full tw-gap-4">
          {summaryStatsArray && (
            <SummaryStatsCard
              summaryStatsData={summaryStatsArray}
              isLoading={isStatsLoading}
            />
          )}
          <WaiverMarkdownCard content="" />
        </div>

        <div className="tw-mt-5 tw-rounded-md tw-border">
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
              columns={WaiverTableColumns}
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

export default WaiverPage;
