import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

import {
  HOURS_MINUTE_HYPEN_FORMAT,
  YEAR_MONTH_DAY_FORMAT,
} from '../../../constants/dateFormats';
import { useTeamOrgContext } from '../../../context/useTeamOrgContext';
import { LinkItem } from '../LumoAgGrid/CellRenderers/HyperLink';
import { TitleSubtitleData } from '../LumoAgGrid/CellRenderers/TitleSubtitle';

export interface TableInputData {
  select?: string;
  read?: string;
  bookingReference: LinkItem;
  sequence: string;
  org: TitleSubtitleData;
  primaryTraveler: LinkItem;
  travelers: number;
  events: LinkItem[];
  group: LinkItem;
  departs: TitleSubtitleData & { fullDateTime: string };
  origin: TitleSubtitleData;
  destination: TitleSubtitleData;
  arrives: TitleSubtitleData & { fullDateTime: string };
  stops: number;
  flights: LinkItem[];
  hotels: TitleSubtitleData[];
  transport: TitleSubtitleData[];
  cancelled: boolean;
  delay: number;
  misconnect: boolean;
  avgRiskScore: number;
  waiver: boolean;
  channel?: string;
  timestamp?: (TitleSubtitleData & { fullDateTime: string }) | string;
  alertType?: string;
  summary?: string;
  contact?: string;
}

export const extractField = <T,>(
  data: T,
  path: (keyof T)[]
): T[keyof T] | '' => {
  return path.reduce(
    (acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key] as T[keyof T];
      }
      return '' as T[keyof T];
    },
    data as T[keyof T]
  );
};
interface FormattedData {
  read?: string;
  select?: string;
  bookingReference: string;
  sequence: string;
  org: string;
  primaryTraveler: string;
  travelers: number;
  events: string;
  group: string;
  departs: string;
  origin: string;
  destination: string;
  arrives: string;
  stops: number;
  flights: string;
  hotels: string;
  transport: string;
  cancelled: boolean;
  delay: number;
  misconnect: boolean;
  avgRiskScore: number;
  waiver: boolean;
  channel?: string;
  timestamp?: string;
  alertType?: string;
  summary?: string;
  contact?: string;
}

//Formatting the row data into export format
export const formatRowData = (data: TableInputData): FormattedData => {
  const formattedData: FormattedData = {
    read: data.select ? 'Yes' : 'No',
    bookingReference: data.bookingReference.label,
    sequence: data.sequence,
    org: `${data.org.title}, ${data.org.subtitle}`,
    primaryTraveler: `${data.primaryTraveler.label} (${data.primaryTraveler.description})`,
    travelers: data.travelers,
    events: data.events
      .map((event) => `${event.label} (${event.description})`)
      .join(', '),
    group: `${data.group.label} (${data.group.description})`,
    departs: data.departs?.fullDateTime || 'N/A',
    origin: `${data.origin?.title} (${data.origin?.subtitle})`,
    destination: `${data.destination?.title} (${data.destination?.subtitle})`,
    arrives: data.arrives?.fullDateTime || 'N/A',
    stops: data.stops,
    flights: data.flights.map((flight) => flight.label).join(', '),
    hotels: data.hotels
      .map((hotel) => `${hotel.title} (${hotel.subtitle})`)
      .join(', '),
    transport: data.transport
      .map((trans) => `${trans.title} (${trans.subtitle})`)
      .join(', '),
    cancelled: data.cancelled,
    delay: data.delay,
    misconnect: data.misconnect,
    avgRiskScore: data.avgRiskScore,
    waiver: Boolean(data.waiver),
    channel: data.channel?.title || 'N/A',
    timestamp: data.timestamp?.fullDateTime || 'N/A',
    alertType: data.alertType?.title || 'N/A',
    summary: data.summary?.title || 'N/A',
    contact: data.contact?.title || 'N/A',
  };

  return formattedData;
};

// Header mapping for CSV columns
export const headerMapping = {
  read: 'Marked as read',
  bookingReference: 'Booking Reference',
  sequence: 'Sequence',
  org: 'Org',
  primaryTraveler: 'Primary Traveler',
  travelers: 'Travelers',
  events: 'Events',
  group: 'Group',
  departs: 'Departs',
  origin: 'Origin',
  destination: 'Destination',
  arrives: 'Arrives',
  stops: 'Stops',
  flights: 'Flights',
  hotels: 'Hotels',
  transport: 'Transport',
  cancelled: 'Cancelled',
  delay: 'Delay',
  misconnect: 'Misconnect',
  avgRiskScore: 'AvgRiskScore',
  waiver: 'Waiver',
  channel: 'Channel',
  timestamp: 'Timestamp',
  alertType: 'Alert Type',
  summary: 'Summary',
  contact: 'Contact',
};

export const onExportClick = (
  gridRef: React.RefObject<AgGridReact>,
  tableName: string
) => {
  if (!gridRef.current) {
    return;
  }
  const gridApi = gridRef.current!.api;

  const displayedColumns = gridApi.getAllDisplayedColumns();

  const rowData: FormattedData[] = [];

  gridApi.forEachNode((node) => {
    const formattedData = formatRowData(node.data);
    rowData.push(formattedData);
  });

  const displayedHeaderMapping = Object.keys(headerMapping).reduce(
    (acc, key) => {
      const typedKey = key as keyof typeof headerMapping;
      const isColumnDisplayed = displayedColumns.some(
        (col) => col.getColDef().field === key
      );
      if (isColumnDisplayed) {
        acc[typedKey] = headerMapping[typedKey];
      }
      return acc;
    },
    {} as Record<keyof typeof headerMapping, string>
  );

  const formattedRowData = rowData.map((row) => {
    const mappedRow: { [key: string]: string | number | boolean | undefined } =
      {};

    Object.keys(row).forEach((key) => {
      const typedKey = key as keyof FormattedData;
      const headerKey = key as keyof typeof headerMapping;
      if (displayedHeaderMapping[headerKey]) {
        mappedRow[displayedHeaderMapping[headerKey]] = row[typedKey];
      }
    });
    return mappedRow;
  });

  // Convert the data to CSV
  const worksheet = XLSX.utils.json_to_sheet(formattedRowData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const currentDate = dayjs().format(YEAR_MONTH_DAY_FORMAT);
  const currentTime = dayjs().format(HOURS_MINUTE_HYPEN_FORMAT);

  const fileName = `${tableName}-${currentDate}-${currentTime}.csv`;

  // Create a downloadable link and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const DownloadButton = ({
  gridRef,
  tableName,
  data = [],
}: {
  gridRef: React.RefObject<AgGridReact>;
  tableName: string;
  data?: TableInputData[];
}) => {
  const handleDownloadClick = () => {
    onExportClick(gridRef, tableName);
  };

  const {
    state: { selectedOrg, selectedTeam },
  } = useTeamOrgContext();

  // ToDo remove this once actual API comes
  const isDownloadDisabled =
    selectedOrg === '.apple.inc' &&
    selectedTeam === 'fa2f9d1e-2218-4107-bfd3-d1e8dd5ee091';

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleDownloadClick}
      disabled={isDownloadDisabled || data.length === 0}
      className="tw-h-9 tw-w-9 !tw-min-w-[36px] tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600"
    >
      <DownloadIcon />
    </Button>
  );
};
