import { LinkItem } from '../components/common/LumoAgGrid/CellRenderers/HyperLink';
import { TitleSubtitleData } from '../components/common/LumoAgGrid/CellRenderers/TitleSubtitle';

export type TripTableRowType = {
  read?: boolean;

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
  cancelled?: boolean;
  delay?: number;
  misconnect?: boolean;
  avgRiskScore?: number;
  waiver?: boolean;
  select?: boolean;
  timestamp: TitleSubtitleData & { fullDateTime: string };
  channel?: string;
  alertType?: string;
  summary?: string;
  contact?: string;
};
