import { AgGridReact } from 'ag-grid-react';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import useTravelerDetails from '../../../api/useTravelerDetails';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import useSummaryStatsData from '../../../hooks/useSummaryStatsData';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import LumoAgGrid from '../../common/LumoAgGrid/Index';
import SummaryStatsCard from '../../common/SummaryStats/SummaryStatsCard';
import TravelerMarkdownCard from '../../common/TravelerDetails/TravelerMarkdownCard';
import { TravelerTableColumns } from '../../common/TravelerDetails/TravelerTableColumns';
import {
  DownloadButton,
  TableInputData,
} from '../../common/downloads/DownloadAgGridData';

type TravelerDetailPageProps = {
  minHeight?: number;
  maxHeight?: number;
};

const TravelerDetailPage: React.FC<TravelerDetailPageProps> = ({
  minHeight = 290,
  maxHeight = 700,
}) => {
  const { id: travelerId } = useParams();
  const { data, isLoading } = useTravelerDetails({ id: travelerId! });
  const { summaryStatsData, isLoading: isStatsLoading } = useSummaryStatsData();
  const title = 'Traveler';
  const displayName = data?.[0]?.primaryTraveler?.description;
  useSetPageTitle({ title, displayName });

  const summaryStatsArray = useMemo(() => {
    if (!summaryStatsData) return [];
    return [summaryStatsData];
  }, [summaryStatsData]);

  const gridRef = useRef<AgGridReact>(null);

  const dynamicTableName = `Trips-${title}-${travelerId}`;
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
          <TravelerMarkdownCard content="" />
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
              columns={TravelerTableColumns}
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

export default TravelerDetailPage;
