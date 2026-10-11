import { formatDateToDayMonth, getTimeFromDateTime } from '../../../utils/date';

type FlightEventDetailsProps = {
  airportInfo: { code: string; city: string };
  flightDetails: {
    scheduled: string;
    latest: string;
    gate: string;
    baggage?: string;
    terminal: string;
  };
  delay: {
    value: string;
    color: string;
  };
};

function FlightEventDetails({
  airportInfo,
  flightDetails,
  delay,
}: FlightEventDetailsProps) {
  return (
    <div className="tw-text-center">
      <h3 className="tw-text-lg tw-font-bold">{airportInfo?.code}</h3>
      <p>{airportInfo?.city}</p>
      <p>
        {formatDateToDayMonth(flightDetails?.scheduled)} /{' '}
        {getTimeFromDateTime(flightDetails?.scheduled)}
      </p>

      {/* Delay details */}
      <div style={{ color: delay?.color }}>
        <p className="tw-font-bold">
          {getTimeFromDateTime(flightDetails?.latest)}
        </p>
        <p>( {delay?.value} late )</p>
      </div>

      <p>
        Term {flightDetails?.terminal}, Gate {flightDetails?.gate}
      </p>
      {flightDetails?.baggage && <p>Baggage claim {flightDetails?.baggage}</p>}
    </div>
  );
}

export default FlightEventDetails;
