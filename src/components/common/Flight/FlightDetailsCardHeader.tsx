import React from 'react';
import { Link } from 'react-router-dom';

import { FlightLeg } from '../../../types/trip';

type FlightDetailsCardHeaderProps = {
  flightDetails: FlightLeg;
  arrivalDelayColor: string;
};

const FlightDetailsCardHeader: React.FC<FlightDetailsCardHeaderProps> = ({
  flightDetails,
  arrivalDelayColor,
}) => {
  const { previousFlight } = flightDetails.flight;
  return (
    <div className="tw-flex tw-justify-between">
      <div className="tw-text-left">
        <h5>{flightDetails?.flight?.airline?.name}</h5>
        <h6 className="tw-font-bold">
          {flightDetails?.flight?.airline.code} {flightDetails?.flight?.number}
        </h6>
        <p>Airbus A 321 Neo</p>
      </div>
      <div className="tw-text-center">
        <h5>Status</h5>
        <div style={{ color: arrivalDelayColor }}>
          <h6 className="tw-text-lg tw-font-bold tw-uppercase">
            {flightDetails?.status?.text}
          </h6>
          <p>( Departs in 16 hours )</p>
        </div>
      </div>
      {/* previous flight link */}
      {previousFlight ? (
        <div className="tw-text-right">
          <h5>Tail No</h5>
          <h6 className="tw-font-bold">{previousFlight.tailNumber}</h6>

          <Link
            to={`/flights/${previousFlight.id}`}
            className="tw-text-blue-500 hover:tw-underline"
          >
            Previous Flight
          </Link>
        </div>
      ) : (
        <div>No Previous Flight</div>
      )}
    </div>
  );
};

export default FlightDetailsCardHeader;
