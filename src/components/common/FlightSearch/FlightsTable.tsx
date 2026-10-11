import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FlightSearchTableRowType } from '../../../types/flightSearchTable';
import LumoAgGrid from '../LumoAgGrid/Index';
import { FlightsTableColumns } from './FlightsTableColumns';

type FlightsTableProps = {
  flights: FlightSearchTableRowType[];
  minHeight?: number;
  maxHeight?: number;
};

const FlightsTable: React.FC<FlightsTableProps> = ({
  flights,
  minHeight,
  maxHeight,
}) => {
  const navigate = useNavigate();
  return (
    <LumoAgGrid
      columns={FlightsTableColumns}
      rows={flights!}
      autoSizeStrategy={{ type: 'fitColumnsToContent' }}
      onRowClicked={(e) => navigate(`/flights/${e?.data?.flightId}`)}
      minHeight={minHeight}
      maxHeight={maxHeight}
    />
  );
};

export default FlightsTable;
