import {
  HOURS_MINS_FORMAT,
  YEAR_MONTH_DAY_FORMAT,
  YEAR_MONTH_DAY_HOURS_MINS_FORMAT,
} from '../constants/dateFormats';
import { FlightSearchTableRowType } from '../types/flightSearchTable';
import { FlightLeg } from '../types/trip';
import { formateDate } from './date';

export const flightSearchTableDataTransformer = (
  data: FlightLeg[]
): FlightSearchTableRowType[] => {
  return data?.map((flight) => {
    const departs = {
      title: formateDate(
        flight.status.departure.scheduled,
        YEAR_MONTH_DAY_FORMAT
      ),
      subtitle: formateDate(
        flight.status.departure.scheduled,
        HOURS_MINS_FORMAT
      ),
      fullDateTime: formateDate(
        flight.status.departure.scheduled,
        YEAR_MONTH_DAY_HOURS_MINS_FORMAT
      ),
    };
    const origin = {
      title: flight?.flight?.departure?.code,
      subtitle: flight?.flight?.departure?.city,
    };

    const destination = {
      title: flight?.flight?.arrival?.code,
      subtitle: flight?.flight?.arrival?.city,
    };

    const arrives = {
      title: formateDate(
        flight.status.arrival.scheduled,
        YEAR_MONTH_DAY_FORMAT
      ),
      subtitle: formateDate(flight.status.arrival.scheduled, HOURS_MINS_FORMAT),
      fullDateTime: formateDate(
        flight.status.arrival.scheduled,
        YEAR_MONTH_DAY_HOURS_MINS_FORMAT
      ),
    };

    return {
      flightId: flight?.flight?.id,
      airline: { title: flight?.flight?.airline?.name },
      flightNo: {
        title: `${flight?.flight?.airline.code} ${flight?.flight?.number}`,
      },
      departs,
      origin,
      destination,
      arrives,
      status: { title: flight?.status.text },
      cancelled: true,
      delay: 120,
      misconnect: true,
      avgRiskScore: 5.5,
      waiver: true,
    };
  });
};
