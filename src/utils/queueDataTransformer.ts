import {
  HOURS_MINS_FORMAT,
  YEAR_MONTH_DAY_FORMAT,
  YEAR_MONTH_DAY_HOURS_MINS_FORMAT,
} from '../constants/dateFormats';
import { QueueDetails } from '../types/queue';
import { TripTableRowType } from '../types/tripsTableRowType';
import { formateDate } from './date';

function queueDataTransformer({ data }: { data: QueueDetails[] }) {
  return data?.reduce((acc, queueItem) => {
    const [primaryTraveler] = queueItem?.travelers.filter(
      (traveler) => traveler.primary
    );

    const trips = queueItem?.trips?.map((trip) => {
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

      const queue = queueItem.queue || {};

      const channel = queue?.channel
        ? {
            title: queue.channel,
          }
        : { title: 'N/A' };

      const select = queue?.read;

      const summary = queue?.summary
        ? {
            title: queue.summary,
          }
        : { title: 'N/A' };

      const contact = queue?.contact
        ? {
            title: queue.contact,
          }
        : { title: 'N/A' };

      const timestamp = queue?.timestamp
        ? {
            title: formateDate(queue.timestamp, YEAR_MONTH_DAY_FORMAT),
            subtitle: formateDate(queue.timestamp, HOURS_MINS_FORMAT),
            fullDateTime: formateDate(
              queue.timestamp,
              YEAR_MONTH_DAY_HOURS_MINS_FORMAT
            ),
          }
        : { title: 'N/A' };

      const alertType = queue?.alertType
        ? {
            title: queue.alertType,
          }
        : { title: 'N/A' };

      const origin = trip?.flights?.length
        ? {
            title: trip?.flights[0].flight.departure.code,
            subtitle: trip?.flights[0].flight.departure.city,
          }
        : null;

      const destination = trip?.flights?.length
        ? {
            title: trip?.flights[trip?.flights.length - 1].flight.arrival.code,
            subtitle:
              trip?.flights[trip?.flights.length - 1].flight.arrival.city,
          }
        : null;

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
          href: `/trips/${queueItem?.uid}`,
          label: queueItem.booking_reference,
        },
        sequence: trip.sequence,
        org: { title: queueItem?.org?.path, subtitle: queueItem?.org?.name },
        primaryTraveler: {
          href: `/traveler/${primaryTraveler?.uid}`,
          label: primaryTraveler?.email,
          description: primaryTraveler?.name,
        },
        travelers: queueItem?.travelers?.length,
        events: queueItem?.events?.map((event) => ({
          href: `/events/${event?.uid}`,
          label: event?.uid,
          description: event?.name,
        })),
        group: {
          href: `/group/${queueItem?.group?.uid}`,
          label: queueItem?.group?.uid,
          description: queueItem?.group?.name,
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
        hotels: queueItem?.hotels?.map((hotel) => ({
          title: hotel.details,
          subtitle: hotel.location,
        })),
        transport: queueItem?.ground_transport?.map((transport) => ({
          title: transport?.details,
          subtitle: transport?.confirmation,
        })),
        cancelled: trip?.disruption_summary?.cancelled,
        delay: trip?.disruption_summary?.delay,
        misconnect: trip?.disruption_summary?.misconnect,
        avgRiskScore: trip?.disruption_summary?.risk.score,
        waiver: trip?.disruption_summary?.waiver,
        select,
        channel,
        contact,
        timestamp,
        alertType,
        summary,
      } as TripTableRowType;
    });
    return [...acc, ...trips];
  }, [] as TripTableRowType[]);
}

export default queueDataTransformer;
