import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import clsx from 'clsx';

import { FlightLeg } from '../../../types/trip';
import { getDelayColor } from '../../../utils/colors';
import {
  calculateDateDifferenceInMins,
  convertMinsToHoursAndMins,
  formatDateToDayMonth,
  getTimeFromDateTime,
} from '../../../utils/date';
import { convertDecimalToPercentage } from '../../../utils/number-util';

const TripLeg: React.FC<{
  flightDetails: FlightLeg;
}> = ({ flightDetails }) => {
  const departureDelayInMins = calculateDateDifferenceInMins(
    flightDetails.status.departure.scheduled,
    flightDetails.status.departure.latest
  );
  const departureDelay = convertMinsToHoursAndMins(departureDelayInMins);
  const departureDelayColor = getDelayColor(departureDelayInMins);

  const arrivalDelayInMins = calculateDateDifferenceInMins(
    flightDetails.status.arrival.scheduled,
    flightDetails.status.arrival.latest
  );
  const arrivalDelay = convertMinsToHoursAndMins(arrivalDelayInMins);
  const arrivalDelayColor = getDelayColor(arrivalDelayInMins);

  return (
    <div
      key={flightDetails.flight.id}
      className={clsx(
        'tw-flex tw-w-full tw-border-r tw-border-zinc-300',
        flightDetails.connecting_to ? 'tw-col-span-3' : 'tw-col-span-2'
      )}
    >
      <div
        className={clsx(flightDetails.connecting_to ? 'tw-w-4/6' : 'tw-w-full')}
      >
        {/* Name/Number and status */}
        <div className="tw-flex tw-justify-between tw-border-b tw-border-zinc-300 tw-p-3">
          <div>
            <div>{flightDetails.flight.airline.name}</div>
            <div className="tw-font-bold">{`${flightDetails.flight.airline.code} ${flightDetails.flight.number}`}</div>
          </div>
          <div className="tw-text-right">
            <div>Status</div>
            <div
              style={{
                color: arrivalDelayColor,
              }}
              className="tw-text-base tw-font-bold"
            >
              {flightDetails.status.text.toUpperCase()}
            </div>
          </div>
        </div>
        {/* Arrival and departure */}
        <div className="tw-flex tw-justify-evenly tw-border-b tw-border-zinc-300 tw-p-3 tw-text-center">
          <div>
            <div className="tw-text-lg tw-font-bold">
              {flightDetails.flight.departure.code}
            </div>
            <div>{flightDetails.flight.departure.city}</div>
            <div>
              {formatDateToDayMonth(flightDetails.status.departure.scheduled)}
            </div>
            <div>
              {getTimeFromDateTime(flightDetails.status.departure.scheduled)}
            </div>
            <div
              style={{ color: departureDelayColor }}
              className="tw-font-bold"
            >
              <div className="tw-pt-2">
                {getTimeFromDateTime(flightDetails.status.departure.latest)}
              </div>
              {departureDelay && <div>{departureDelay} late</div>}
            </div>
          </div>
          <ArrowRightAltIcon fontSize="large" />
          <div>
            <div className="tw-text-lg tw-font-bold">
              {flightDetails.flight.arrival.code}
            </div>
            <div>{flightDetails.flight.arrival.city}</div>
            <div>
              {formatDateToDayMonth(flightDetails.status.arrival.scheduled)}
            </div>
            <div>
              {getTimeFromDateTime(flightDetails.status.arrival.scheduled)}
            </div>
            <div style={{ color: arrivalDelayColor }} className="tw-font-bold">
              <div className="tw-pt-2">
                {getTimeFromDateTime(flightDetails.status.arrival.latest)}
              </div>
              {arrivalDelay && <div>{arrivalDelay} late</div>}
            </div>
          </div>
        </div>

        {/* Risk */}
        <div className="tw-p-3">
          <span className="tw-text-2xl tw-font-bold">
            {flightDetails?.prediction.risk?.score}
          </span>
          /10
          <div>{`${flightDetails?.prediction.risk?.level.toUpperCase()} RISK`}</div>
        </div>
      </div>
      {flightDetails.connecting_to ? (
        <div className="tw-w-2/6 tw-border-l tw-border-zinc-300 tw-p-2 tw-text-center tw-text-xs">
          <div>Planned connection</div>
          <div className="tw-pb-4">
            {convertMinsToHoursAndMins(
              flightDetails.connecting_to.connection_time.scheduled
            )}
          </div>
          <div>Minimum required</div>
          <div className="tw-pb-4">
            {convertMinsToHoursAndMins(
              flightDetails.connecting_to.connection_time.minimum
            )}
          </div>
          <div>Current connection</div>
          <div className="tw-pb-4 tw-font-bold">
            {convertMinsToHoursAndMins(
              flightDetails.connecting_to.connection_time.latest
            )}
          </div>
          <div className="tw-pb-3">
            <span className="tw-text-2xl tw-font-bold">
              {convertDecimalToPercentage(
                flightDetails?.connecting_to?.probability_misconnect
              )}
            </span>

            <div className="tw-font-semibold">Missed connection likelihood</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TripLeg;
