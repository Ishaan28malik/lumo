import { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';

import useFlightSearch from '../../../api/useFlightSearch';
import { FlightSearchFilter } from '../../../types/flightSearchTable';
import FlightFilter from '../../common/FlightSearch/FlightFilter';
import FlightsTable from '../../common/FlightSearch/FlightsTable';

const FlightsSearchPage = () => {
  const [filter, setFilter] = useState<FlightSearchFilter>({
    departure: null,
    origin: '',
    include_nearby_origin: false,
    destination: '',
    include_nearby_destination: false,
    airline: '',
    flightno: '',
  });

  const onFilterChange = useCallback(
    ({ name, value }: { name: string; value: string | boolean | Dayjs }) => {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const { data: flights = [], refetch } = useFlightSearch({
    params: filter,
    enabled: !!filter.departure,
  });

  return (
    <div>
      <FlightFilter
        filter={filter}
        onFilterChange={onFilterChange}
        refetch={refetch}
      />
      <FlightsTable flights={flights} minHeight={300} maxHeight={585} />
    </div>
  );
};

export default FlightsSearchPage;
