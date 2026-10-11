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
export type BookingDetails = {
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

export type QueueDetails = {
  alertType: string;
  timestamp: string | number | Date;
  contact: string;
  channel: string;
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
  read: boolean;
};

export type QueueInfoParams = {
  delay?: number;
  risk?: number;
  horizon?: number;
  org: string;
  team: string;
};

export type useQueueInfoProps = {
  params: QueueInfoParams;
};
