import {
  HOURS_MINS_FORMAT,
  YEAR_MONTH_DAY_FORMAT,
  YEAR_MONTH_DAY_HOURS_MINS_FORMAT,
} from '../constants/dateFormats';
import { BookingDetails } from '../types/booking';
import { TripTableRowType } from '../types/tripsTableRowType';
import { formateDate } from './date';

function bookingDataTransformer({ data }: { data: BookingDetails[] }) {
  return data?.reduce((acc, booking) => {
    const [primaryTraveler] = booking?.travelers.filter(
      (traveler) => traveler.primary
    );

    const trips = booking?.trips?.map((trip) => {
      // departs =>  scheduled time of first fight in flights list

      const departs = trip?.flights?.length
        ? {
            title: formateDate(
              trip?.flights[0].status.departure.scheduled,
              YEAR_MONTH_DAY_FORMAT
            ),
            subtitle: formateDate(
              trip?.flights[0].status.departure.scheduled,
              HOURS_MINS_FORMAT
            ),
            fullDateTime: formateDate(
              trip?.flights[0].status.departure.scheduled,
              YEAR_MONTH_DAY_HOURS_MINS_FORMAT
            ),
          }
        : null;

      // origin => departure of first flight in flights list
      const origin = trip?.flights?.length
        ? {
            title: trip?.flights[0].flight.departure.code,
            subtitle: trip?.flights[0].flight.departure.city,
          }
        : null;

      // destination => arrival of last flight in flights list
      const destination = trip?.flights?.length
        ? {
            title: trip?.flights[trip?.flights.length - 1].flight.arrival.code,
            subtitle:
              trip?.flights[trip?.flights.length - 1].flight.arrival.city,
          }
        : null;

      // arrives => scheduled arrival of last flight in flights list
      const arrives = trip?.flights?.length
        ? {
            title: formateDate(
              trip?.flights[trip?.flights.length - 1].status.arrival.scheduled,
              YEAR_MONTH_DAY_FORMAT
            ),
            subtitle: formateDate(
              trip?.flights[trip?.flights.length - 1].status.arrival.scheduled,
              HOURS_MINS_FORMAT
            ),
            fullDateTime: formateDate(
              trip?.flights[trip?.flights.length - 1].status.arrival.scheduled,
              YEAR_MONTH_DAY_HOURS_MINS_FORMAT
            ),
          }
        : null;

      return {
        bookingReference: {
          href: `/trips/${booking?.uid}`,
          label: booking.booking_reference,
        },
        sequence: trip.sequence,
        org: { title: booking?.org?.path, subtitle: booking?.org?.name },
        primaryTraveler: {
          href: `/traveler/${primaryTraveler?.uid}`,
          label: primaryTraveler?.email,
          description: primaryTraveler?.name,
        },
        travelers: booking?.travelers?.length,
        events: booking?.events?.map((event) => ({
          href: `/events/${event?.uid}`,
          label: event?.uid,
          description: event?.name,
        })),
        group: {
          href: `/group/${booking?.group?.uid}`,
          label: booking?.group?.uid,
          description: booking?.group?.name,
        },
        departs,
        origin,
        destination,
        arrives,
        stops: trip?.flights?.length ? trip?.flights?.length - 1 : 0,
        flights: trip?.flights?.map(({ flight }) => ({
          label: `${flight?.airline?.code}${flight?.number} ${flight?.departure?.code} > ${flight?.arrival?.code}`,
          href: `/flights/${flight.id}`,
        })),
        hotels: booking?.hotels?.map((hotel) => ({
          title: hotel.details,
          subtitle: hotel.location,
        })),
        transport: booking?.ground_transport?.map((transport) => ({
          title: transport?.details,
          subtitle: transport?.confirmation,
        })),
        cancelled: trip?.disruption_summary?.cancelled,
        delay: trip?.disruption_summary?.delay,
        misconnect: trip?.disruption_summary?.misconnect,
        avgRiskScore: trip?.disruption_summary?.risk.score,
        waiver: trip?.disruption_summary?.waiver,
      } as TripTableRowType;
    });
    return [...acc, ...trips];
  }, [] as TripTableRowType[]);
}

export default bookingDataTransformer;
