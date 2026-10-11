type TripStatus = 'past' | 'active' | 'coming';

type Airline = {
  code: string;
  name: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Airport = {
  code: string;
  name: string;
  city: string;
  coordinates: Coordinates;
};

type FlightDetails = {
  id: string;
  airline: Airline;
  operating_airline: Airline;
  number: number;
  aircraft_type: {
    code: string;
    description: string;
  };
  departure: Airport;
  arrival: Airport;
  previousFlight: {
    tailNumber: string;
    id: string;
  };
};

type FlightPrediction = {
  risk: {
    score: number;
    level: string;
  };
  probability: number[];
  reason: string;
};

type Schedule = {
  scheduled: string;
  latest: string;
  delay: number;
  terminal: string;
  gate: string;
  baggage?: string;
};

type FlightStatus = {
  cancelled: boolean;
  diverted: boolean;
  text: string;
  departure: Schedule;
  arrival: Schedule;
};

type FlightConnection = {
  id: string;
  connection_time: {
    scheduled: number;
    minimum: number;
    latest: number;
  };
  probability_misconnect: number;
};

export type FlightLeg = {
  flight: FlightDetails;
  prediction: FlightPrediction;
  status: FlightStatus;
  connecting_to: FlightConnection;
};

type DisruptionSummary = {
  risk: {
    score: number;
    level: string;
  };
  cancelled: boolean;
  delay: number;
  misconnect: boolean;
  waiver: boolean;
};

export type TripDetails = {
  sequence: string;
  name: string;
  status: TripStatus;
  disruption_summary: DisruptionSummary;
  flights: FlightLeg[];
};
