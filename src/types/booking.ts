import { TripDetails } from './trip';

export type TravelerDetails = {
  uid: string;
  name: string;
  email: string;
  primary: boolean;
};

export type HotelDetails = {
  confirmation: string;
  details: string;
  location: string;
  check_in: string;
  check_out: string;
};

export type TransportDetails = {
  confirmation: string;
  details: string;
  start_date: string;
  end_date: string | null;
};

export type EventDetails = {
  uid: string;
  name: string;
};

export type groupDetails = {
  uid: string;
  name: string;
};

export type OrganizationDetails = {
  path: string;
  name: string;
};
export type TravelAdvisory = {
  id: string;
  issued_by: string;
  advisory: string;
  url: string;
  scope: string;
  last_updated: string;
  type: string;
};

export type OrgSummaryStats = {
  path: string;
  name: string;
  totalTrips: number;
  totalTravelers: number;
  tripStatistics: {
    cancelledTrips: number;
    delayedTrips: number;
    missedConnections: number;
    tripsAtRisk: number;
    averageRiskScore: number;
    travelAlerts: number;
  };
};

export type BookingDetails = {
  travelAdvisory: TravelAdvisory[];
  uid: string;
  booking_reference: string;
  name: string;
  summary: {
    markdown: string;
  };
  org: OrganizationDetails;
  events: EventDetails[];
  group: groupDetails;
  hotels: HotelDetails[];
  ground_transport: TransportDetails[];
  travelers: TravelerDetails[];
  trips: TripDetails[];
};

export type SummaryStats = {
  uid: string;
  booking_reference: string;
  name: string;
  summary: {
    markdown: string;
  };
  org: OrgSummaryStats;
  events: EventDetails[];
  group: groupDetails;
  hotels: HotelDetails[];
  ground_transport: TransportDetails[];
  travelers: TravelerDetails[];
  trips: TripDetails[];
};
