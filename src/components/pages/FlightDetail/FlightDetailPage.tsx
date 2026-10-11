import { useParams } from 'react-router-dom';

import { useFlightInfo } from '../../../api/useFlightInfo';
import { useTravelAdvisory } from '../../../api/useTravelAdvisory';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import { flightData } from '../../../utils/getHistoryDummydata';
import FlightDetailsCard from '../../common/Flight/FlightDetailsCard';
import TravelAdvisoryCard from '../../common/Flight/TravelAdvisoryCard';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import TripTable from '../../common/TripTable';
import HistoryCard from '../DelayHistory/HistoryCard';

const FlightDetailPage = () => {
  const { id: flightId } = useParams();
  const { data, isLoading } = useFlightInfo({ id: flightId! });
  const { data: travelAdvisoryData } = useTravelAdvisory({ id: flightId! });

  //set page title
  const title = 'Flight';
  const referenceId = data?.data?.flightDetails?.connecting_to?.id;
  useSetPageTitle({ title, referenceId });

  const dynamicTableName = `${title}-${flightId}`;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <div className="tw-mb-2 tw-grid tw-grid-cols-2">
        <div className="tw-space-y-2">
          <FlightDetailsCard flightDetails={data?.data?.flightDetails} />
        </div>
        {/* Bar chart */}
        <div className="tw-ml-4 tw-flex tw-flex-col tw-gap-2">
          <HistoryCard flightData={flightData} />
          <TravelAdvisoryCard
            travelAdvisory={travelAdvisoryData?.data?.travelAdvisory}
          />
        </div>
      </div>
      <TripTable
        isHomePage={false}
        flightId={flightId}
        tableName={dynamicTableName}
      />
    </LoadingWrapper>
  );
};

export default FlightDetailPage;
