import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import clsx from 'clsx';
import { useState } from 'react';

import { tripStatus } from '../../../constants/tripStatus';
import { TripDetails } from '../../../types/trip';
import TripLeg from './TripLeg';

const TripDetailsCard: React.FC<{
  trip: TripDetails;
}> = ({ trip }) => {
  const [isOpen, setIsOpen] = useState(trip.status !== tripStatus.PAST);

  const toggleAccordionComponent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accordion
      className={clsx(
        'tw-mb-4 tw-rounded-md tw-border tw-border-zinc-300 tw-px-6 tw-py-2 tw-text-xs'
      )}
      sx={{
        backgroundColor:
          trip.status === tripStatus.PAST ? '#d4d4d4' : 'transparent',
      }}
      expanded={isOpen} // Control expansion with isOpen state
    >
      {/* Accordion Header */}
      <AccordionSummary
        className={clsx(
          'tw-flex tw-cursor-pointer tw-flex-row tw-justify-between tw-border-b tw-border-b-neutral-400 tw-px-1 tw-py-0 tw-text-xl tw-font-bold',
          isOpen && 'tw-border-b tw-border-neutral-400'
        )}
        onClick={toggleAccordionComponent}
        sx={{
          borderBottom: isOpen ? '2px solid #b4b6b6' : 'none',
        }}
      >
        <div className="tw-flex tw-w-full tw-flex-row tw-justify-between">
          <div>
            {trip.name} - {trip.status.toUpperCase()}
          </div>
          <div>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
      </AccordionSummary>
      {/* Accordion Content */}
      {isOpen && (
        <AccordionDetails className="tw-px-6 tw-pb-3">
          <div className="tw-mt-4 tw-rounded-md tw-border tw-border-transparent tw-bg-white tw-px-4 tw-py-0.5">
            <span className="tw-text-sm">OVERALL LUMO INDEX</span>
            <div>
              <span className="tw-text-2xl tw-font-bold">
                {trip.disruption_summary?.risk?.score}
              </span>
              /10
            </div>
            <div className="tw-pb-2">
              <span className="tw-font-bold">
                {trip.disruption_summary?.risk?.level}
              </span>{' '}
              RISK
            </div>

            <hr className="tw-border-zinc-300" />

            {/* Grid with the legs and connection */}
            <div className="tw-grid tw-grid-cols-11 tw-pt-2">
              {trip.flights.map((flightDetails) => {
                return (
                  <TripLeg
                    key={flightDetails.flight.id}
                    flightDetails={flightDetails}
                  />
                );
              })}
            </div>
          </div>
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default TripDetailsCard;
