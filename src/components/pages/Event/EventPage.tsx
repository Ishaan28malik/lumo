import { AgGridReact } from 'ag-grid-react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import useEventDetails from '../../../api/useEventDetails';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import useSummaryStatsData from '../../../hooks/useSummaryStatsData';
import EventsMarkdownCard from '../../common/Events/EventsMarkdownCard';
import { EventTableColumns } from '../../common/Events/EventsTableColumns';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import LumoAgGrid from '../../common/LumoAgGrid/Index';
import SummaryStatsCard from '../../common/SummaryStats/SummaryStatsCard';
import {
  DownloadButton,
  TableInputData,
} from '../../common/downloads/DownloadAgGridData';

type EventPageProps = {
  minHeight?: number;
  maxHeight?: number;
};

const EventPage: React.FC<EventPageProps> = ({
  minHeight = 290,
  maxHeight = 700,
}) => {
  const { id: eventId } = useParams();
  const { data, isLoading } = useEventDetails({ id: eventId! });

  const title = 'Event';
  const displayName = data?.[0]?.events?.[0]?.description;
  useSetPageTitle({ title, displayName });

  const { summaryStatsData, isLoading: isStatsLoading } = useSummaryStatsData();

  const gridRef = useRef<AgGridReact>(null);

  const dynamicTableName = `Trips-${title}-${eventId}`;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <div>
        <div className="tw tw-mb-5 tw-flex tw-w-full tw-gap-4">
          {summaryStatsData && (
            <SummaryStatsCard
              summaryStatsData={[summaryStatsData]}
              isLoading={isStatsLoading}
            />
          )}

          <EventsMarkdownCard content="" />
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
              columns={EventTableColumns}
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

export default EventPage;
