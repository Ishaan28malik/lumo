import { LinkItem } from '../components/common/LumoAgGrid/CellRenderers/HyperLink';
import { TitleSubtitleData } from '../components/common/LumoAgGrid/CellRenderers/TitleSubtitle';
import {
  DaySummaryStats,
  EventDetails,
  GroupDetails,
  OrgSummaryStats,
  TravelerDetails,
  TripStatistics,
  WaiverDetails,
} from './summaryStats';

export type SummaryStatsRowType = {
  uid: string;
  bookingReference: LinkItem;
  name: TitleSubtitleData;
  summary: {
    markdown: string;
  };
  day?: DaySummaryStats[];
  orgs: OrgSummaryStats[];
  travelers: TravelerDetails[];
  events: EventDetails[];
  groups: GroupDetails[];
  waivers: WaiverDetails[];
  totalTrips?: number;
  totalTravelers?: number;
  tripStatistics?: TripStatistics;
  read: boolean;
  contact: string;
};
