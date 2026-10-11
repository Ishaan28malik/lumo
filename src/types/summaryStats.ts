import { LinkItem } from '../components/common/LumoAgGrid/CellRenderers/HyperLink';
import { TitleSubtitleData } from '../components/common/LumoAgGrid/CellRenderers/TitleSubtitle';

export type SummaryStatsRowType = {
  uid: string;
  bookingReference: LinkItem;
  name: TitleSubtitleData;
  summary: {
    markdown: string;
  };
  day?: DaySummaryStats;
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

export type TripStatistics = {
  cancelledTrips: number;
  delayedTrips: number;
  missedConnections: number;
  tripsAtRisk: number;
  averageRiskScore: number;
  travelAlerts: number;
  waiver: string;
};

export type OrgSummaryStats = {
  uid: string;
  name: string;
  totalTrips: number;
  totalTravelers: number;
  tripStatistics: TripStatistics;
};

export type TravelerDetails = {
  uid: string;
  name: string;
  email: string;
  primary: boolean;
  tripStatistics: TripStatistics;
};

export type EventDetails = {
  uid: string;
  name: string;
  location?: string;
  totalTrips: number;
  totalTravelers: number;
  tripStatistics: TripStatistics;
};

export type GroupDetails = {
  uid: string;
  name: string;
  totalTrips: number;
  totalTravelers: number;
  tripStatistics: TripStatistics;
};

export type WaiverDetails = {
  uid: string;
  name: string;
  reason: string;
  affectedTrips: number;
  affectedTravelers: number;
  tripStatistics: TripStatistics;
};

export type DaySummaryStats = {
  uid: string;
  name: string;
  totalTrips: number;
  totalTravelers: number;
  tripStatistics: TripStatistics;
};
