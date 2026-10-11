import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';
import { useMemo } from 'react';

import { FlightLeg } from '../../../types/trip';
import { getDelayColor } from '../../../utils/colors';
import {
  calculateDateDifferenceInMins,
  convertMinsToHoursAndMins,
} from '../../../utils/date';
import RainingIcon from '../IconWrapper/RainingIcon';
import ThunderIcon from '../IconWrapper/ThunderIcon';
import FlightDetailsCardHeader from './FlightDetailsCardHeader';
import FlightEventDetails from './FlightEventDetails';
import WeatherInfo from './WeatherInfo';

type FlightDetailsCardProps = { flightDetails: FlightLeg };

function FlightDetailsCard({ flightDetails }: FlightDetailsCardProps) {
  const { departureDelay, departureDelayColor } = useMemo(() => {
    const departureDelayInMins = calculateDateDifferenceInMins(
      flightDetails?.status?.departure?.scheduled,
      flightDetails?.status?.departure?.latest
    );
    const departureDelay = convertMinsToHoursAndMins(departureDelayInMins);
    const departureDelayColor = getDelayColor(departureDelayInMins);
    return { departureDelay, departureDelayColor };
  }, [
    flightDetails?.status?.departure?.scheduled,
    flightDetails?.status?.departure?.latest,
  ]);

  const { arrivalDelay, arrivalDelayColor } = useMemo(() => {
    const arrivalDelayInMins = calculateDateDifferenceInMins(
      flightDetails?.status?.arrival?.scheduled,
      flightDetails?.status?.arrival?.latest
    );
    const arrivalDelay = convertMinsToHoursAndMins(arrivalDelayInMins);
    const arrivalDelayColor = getDelayColor(arrivalDelayInMins);
    return { arrivalDelay, arrivalDelayColor };
  }, [
    flightDetails?.status?.arrival?.scheduled,
    flightDetails?.status?.arrival?.latest,
  ]);

  return (
    <div className="tw-h-full">
      <div className="tw-h-full tw-rounded tw-border tw-border-gray-200 tw-p-4">
        <FlightDetailsCardHeader
          flightDetails={flightDetails}
          arrivalDelayColor={arrivalDelayColor}
        />

        <hr className="tw-my-4 tw-bg-gray-200" />
        <div className="tw-flex tw-justify-between tw-px-20 tw-pt-3">
          <FlightEventDetails
            airportInfo={flightDetails?.flight?.departure}
            flightDetails={flightDetails?.status?.departure}
            delay={{ value: departureDelay!, color: departureDelayColor }}
          />
          <div className="tw-text-center">
            <ArrowRightIcon sx={{ fontSize: '48px' }} />
            <p>
              {convertMinsToHoursAndMins(
                flightDetails?.connecting_to?.connection_time?.scheduled
              )}
            </p>
          </div>

          <FlightEventDetails
            airportInfo={flightDetails?.flight?.arrival}
            flightDetails={flightDetails?.status?.arrival}
            delay={{ value: arrivalDelay!, color: arrivalDelayColor }}
          />
        </div>
        <hr className="tw-my-4 tw-bg-gray-200" />
        {/* weather details */}
        <div className="tw-flex tw-justify-between tw-px-24 tw-text-center">
          <WeatherInfo
            Icon={RainingIcon}
            temperature="72 ° F"
            type="Cloudy/rain"
          />
          <WeatherInfo
            Icon={ThunderIcon}
            temperature="72 ° F"
            type="Thunderstorm"
          />
        </div>
      </div>
    </div>
  );
}

export default FlightDetailsCard;
