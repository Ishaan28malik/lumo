import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';

import useBookingInfo from '../../../api/useBookingInfo';
import {
  DELAY_THRESHOLD_DEFAULT_VALUE,
  DELAY_THRESHOLD_LABEL,
  DELAY_THRESHOLD_MAX_VALUE,
  DELAY_THRESHOLD_MIN_VALUE,
  HORIZON_DEFAULT_VALUE,
  HORIZON_LABEL,
  HORIZON_MAX_VALUE,
  HORIZON_MIN_VALUE,
  RISK_THRESHOLD_DEFAULT_VALUE,
  RISK_THRESHOLD_LABEL,
  RISK_THRESHOLD_MAX_VALUE,
  RISK_THRESHOLD_MIN_VALUE,
  TRIP_LIMIT,
} from '../../../constants/tripsTable';
import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import LumoAgGrid from '../LumoAgGrid/Index';
import LabeledSlider from '../LumoAgGrid/LabeledSlider';
import {
  DownloadButton,
  TableInputData,
} from '../downloads/DownloadAgGridData';
import { TripTableColumns } from './TripTableColumns';

type TripTableProps = {
  isHomePage?: boolean;
  flightId?: string;
  minHeight?: number;
  maxHeight?: number;
  tableName: string;
};

function TripTable({
  isHomePage = true,
  flightId,
  minHeight = 220,
  maxHeight = 700,
  tableName = 'Trips',
}: TripTableProps) {
  const [rangeFilter, setRangeFilter] = useState({
    delay: DELAY_THRESHOLD_DEFAULT_VALUE,
    risk: RISK_THRESHOLD_DEFAULT_VALUE,
    horizon: HORIZON_DEFAULT_VALUE,
  });

  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  // ToDo remove this once actual API comes
  const shouldFetchData = !(
    selectedOrg === '.apple.inc' &&
    selectedTeam === 'fa2f9d1e-2218-4107-bfd3-d1e8dd5ee091'
  );

  const params = useMemo(
    () =>
      shouldFetchData && isHomePage
        ? {
            delay: rangeFilter.delay,
            risk: rangeFilter.risk,
            horizon: rangeFilter.horizon,
            org: selectedOrg,
            team: selectedTeam,
          }
        : {
            delay: rangeFilter.delay,
            risk: rangeFilter.risk,
            horizon: rangeFilter.horizon,
            org: selectedOrg,
            team: selectedTeam,
            flightid: flightId,
          },
    [
      shouldFetchData,
      isHomePage,
      rangeFilter.delay,
      rangeFilter.risk,
      rangeFilter.horizon,
      selectedOrg,
      selectedTeam,
      flightId,
    ]
  );

  const { data: trips, isLoading } = useBookingInfo({ params });

  //set limit for the trips to be diplayed
  const tripLimitReached = trips && trips.length >= TRIP_LIMIT;

  const gridRows = useMemo(() => {
    if (shouldFetchData) {
      return trips || [];
    }
    return [];
  }, [shouldFetchData, trips]);

  const transformedTrips = useMemo(() => {
    return trips?.map((trip) => ({
      ...trip,
      timestamp: trip.timestamp?.fullDateTime || '',
    })) as TableInputData[];
  }, [trips]);

  const onRangeFilterDragEnd = useCallback((name: string, newValue: number) => {
    setRangeFilter((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterText = (
      document.getElementById('quick-filter-text-box') as HTMLInputElement
    ).value;

    gridRef.current!.api.setGridOption('quickFilterText', filterText);
  }, []);

  return (
    <div className="tw-rounded-md tw-border tw-pb-2">
      <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-px-5 tw-py-2">
        <h3 className="tw-text-left tw-text-lg tw-font-medium">Trips</h3>
        {!isHomePage && (
          <div>
            <DownloadButton
              gridRef={gridRef}
              tableName={tableName}
              data={transformedTrips}
            />
          </div>
        )}
      </div>

      <div className="tw-px-5 tw-py-2 tw-text-left">
        {isHomePage && (
          <>
            <div className="tw-mb-2 tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-20">
              <TextField
                id="quick-filter-text-box"
                onInput={onFilterTextBoxChanged}
                variant="outlined"
                size="small"
                className="tw-mb-1"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <LabeledSlider
                value={rangeFilter.delay}
                min={DELAY_THRESHOLD_MIN_VALUE}
                max={DELAY_THRESHOLD_MAX_VALUE}
                label={DELAY_THRESHOLD_LABEL}
                onDragEnd={onRangeFilterDragEnd}
                name="delay"
                step={5}
              />
              <LabeledSlider
                value={rangeFilter.risk}
                min={RISK_THRESHOLD_MIN_VALUE}
                max={RISK_THRESHOLD_MAX_VALUE}
                label={RISK_THRESHOLD_LABEL}
                onDragEnd={onRangeFilterDragEnd}
                name="risk"
              />
              <LabeledSlider
                value={rangeFilter.horizon}
                min={HORIZON_MIN_VALUE}
                max={HORIZON_MAX_VALUE}
                label={HORIZON_LABEL}
                onDragEnd={onRangeFilterDragEnd}
                name="horizon"
                step={5}
              />
              <DownloadButton
                gridRef={gridRef}
                tableName={tableName}
                data={transformedTrips}
              />
            </div>
            {/* trip limit warning message */}
            {tripLimitReached && (
              <h1 className="tw-my-2 tw-text-right tw-text-sm tw-text-red-500">
                {TRIP_LIMIT} trips limit reached (try narrowing the dates or
                thresholds).
              </h1>
            )}
          </>
        )}
        <div className="tw-mt-4">
          <LumoAgGrid
            columns={TripTableColumns}
            rows={gridRows}
            gridRef={gridRef}
            minHeight={minHeight}
            maxHeight={maxHeight}
            tableName={tableName}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default TripTable;
