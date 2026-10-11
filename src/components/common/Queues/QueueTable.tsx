import {
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import useQueueInfo from '../../../api/useQueueInfo';
import {
  DELAY_THRESHOLD_MAX_VALUE,
  DELAY_THRESHOLD_MIN_VALUE,
} from '../../../constants/queueTable';
import { DEFAULT_RANGE_FILTER, OPTIONS } from '../../../constants/queuesFilter';
import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import { QueueTableRowType } from '../../../types/queuesTableRowType';
import { isWithinDelay } from '../../../utils/date';
import LumoAgGrid from '../LumoAgGrid/Index';
import LabeledSlider from '../LumoAgGrid/LabeledSlider';
import {
  DownloadButton,
  TableInputData,
} from '../downloads/DownloadAgGridData';
import { QueueTableColumns } from './QueueTableColumns';

type TripTableProps = {
  isHomePage?: boolean;
  flightId?: string;
  maxHeight?: number;
  minHeight?: number;
  tableName: string;
};

function QueueTable({
  isHomePage = true,
  flightId,
  minHeight = 290,
  maxHeight = 640,
  tableName = 'Queue',
}: TripTableProps) {
  const [rangeFilter, setRangeFilter] = useState(DEFAULT_RANGE_FILTER);
  const [selectedQueuesOption, setSelectedQueuesOption] = useState<string>('');
  const [showUnread, setShowUnread] = useState(true);

  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  const params = useMemo(() => {
    if (selectedQueuesOption) {
      return isHomePage
        ? {
            delay: rangeFilter.delay,
            risk: rangeFilter.risk,
            horizon: rangeFilter.horizon,
            org: selectedOrg,
            team: selectedTeam,
            showUnread,
          }
        : {
            org: selectedOrg,
            team: selectedTeam,
            flightid: flightId,
            showUnread,
          };
    }
    return null;
  }, [
    isHomePage,
    rangeFilter.delay,
    rangeFilter.risk,
    rangeFilter.horizon,
    selectedOrg,
    selectedTeam,
    flightId,
    selectedQueuesOption,
    showUnread,
  ]);

  const shouldFetchData =
    selectedOrg !== '.apple.inc' ||
    selectedTeam !== 'fa2f9d1e-2218-4107-bfd3-d1e8dd5ee091';

  const { data: queue = [], isLoading } = useQueueInfo(
    shouldFetchData && selectedQueuesOption && params
      ? { params }
      : { params: { org: '', team: '' } }
  );

  const columns = useMemo<ColDef<QueueTableRowType>[]>(
    () => QueueTableColumns,
    []
  );

  const onRangeFilterDragEnd = useCallback((name: string, newValue: number) => {
    setRangeFilter((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowUnread(event.target.checked);
  };

  const filteredQueue = useMemo(() => {
    if (!Array.isArray(queue)) return []; // Ensure queue is always an array

    return queue.filter((item) => {
      const showBasedOnRead = !showUnread || item.select !== showUnread;
      const withinDelay = isWithinDelay(
        item.timestamp.fullDateTime,
        rangeFilter.delay
      );

      return showBasedOnRead && withinDelay;
    });
  }, [queue, showUnread, rangeFilter.delay]);

  const handleTeamChange = (event: SelectChangeEvent<string>) => {
    setSelectedQueuesOption(event.target.value as string);
  };

  const delayLabel = `Show messages from the past ${rangeFilter.delay} day${
    rangeFilter.delay > 1 ? 's' : ''
  }`;

  const hasOrgOptions = OPTIONS.length > 0 && selectedOrg;

  // Transform the filteredQueue to match the TableInputData type
  const transformedQueue = useMemo(() => {
    return filteredQueue.map((item) => ({
      ...item,
      select: item.select ? 'Yes' : 'No',
      timestamp: item.timestamp?.fullDateTime || '', // Ensure timestamp is a string
    })) as TableInputData[];
  }, [filteredQueue]);

  // Dynamic table name
  const dynamicTableName = `${tableName}-${selectedQueuesOption}`;

  return (
    <div className="tw-rounded-md tw-border tw-py-2">
      <h3 className="tw-px-5 tw-pb-1 tw-text-left tw-text-lg tw-font-medium">
        Queue
      </h3>
      <div className="tw-px-5 tw-py-2 tw-text-left">
        <div>
          {isHomePage && (
            <div className="tw-mb-2 tw-flex tw-w-full tw-items-center tw-gap-48">
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  value={selectedQueuesOption}
                  onChange={handleTeamChange}
                  displayEmpty
                  sx={{ width: 350 }}
                  disabled={!hasOrgOptions} // Disable the select if there are no org options
                >
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {hasOrgOptions ? (
                    OPTIONS.map((team) => (
                      <MenuItem key={team.uid} value={team.uid}>
                        {team.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No options available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <LabeledSlider
                value={rangeFilter.delay}
                min={DELAY_THRESHOLD_MIN_VALUE}
                max={DELAY_THRESHOLD_MAX_VALUE}
                label={delayLabel}
                onDragEnd={onRangeFilterDragEnd}
                name="delay"
              />
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Switch checked={showUnread} onChange={handleToggleChange} />
                  <Typography>Show only unread messages</Typography>
                </Stack>
              </FormGroup>
            </div>
          )}
          <div className="tw-mb-4 tw-mt-2 tw-flex tw-justify-end">
            <DownloadButton
              gridRef={gridRef}
              tableName={dynamicTableName}
              data={transformedQueue}
            />
          </div>
        </div>
        <LumoAgGrid
          columns={columns}
          rows={filteredQueue}
          gridRef={gridRef}
          minHeight={minHeight}
          maxHeight={maxHeight}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default QueueTable;
