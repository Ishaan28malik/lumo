import { Dayjs } from 'dayjs';

import { TitleSubtitleData } from '../components/common/LumoAgGrid/CellRenderers/TitleSubtitle';

export type FlightSearchFilter = {
  departure: Dayjs | null;
  origin: string;
  include_nearby_origin: boolean;
  destination: string;
  include_nearby_destination: boolean;
  airline: string;
  flightno: string;
};

export type FlightSearchTableRowType = {
  flightId: string;
  airline: TitleSubtitleData;
  flightNo: TitleSubtitleData;
  departs: TitleSubtitleData & { fullDateTime: string };
  origin: TitleSubtitleData;
  destination: TitleSubtitleData;
  arrives: TitleSubtitleData & { fullDateTime: string };
  status: TitleSubtitleData;
  cancelled: boolean;
  delay: number;
  misconnect: boolean;
  avgRiskScore: number;
  waiver: boolean;
};

export type AeroDetails = {
  code: string;
  name: string;
};

export type DestinationDetails = {
  city: string;
  iata: string;
  name: string;
};
