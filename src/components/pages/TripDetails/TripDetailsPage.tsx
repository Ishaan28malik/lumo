import { useTripDetails } from '../../../api/useTripDetails';
import useSetPageTitle from '../../../hooks/useSetPageTitle';
import { TripDetails } from '../../../types/trip';
import { GENERIC_ERROR_MESSAGE } from '../../../utils/messages';
import TravelAdvisoryCard from '../../common/Flight/TravelAdvisoryCard';
import LoadingWrapper from '../../common/LoadingWrapper/LoadingWrapper';
import TripDetailsCard from '../../common/Trip/TripDetailsCard';
import TripMarkdownCard from '../../common/Trip/TripMarkdownCard';

const TripDetailsPage = () => {
  const { data, isPending, error } = useTripDetails();

  //set page title
  const title = 'Trip';
  const referenceId = data?.data?.booking_reference;
  useSetPageTitle({ title, referenceId });

  if (error) {
    return (
      <div className="tw-w-full tw-text-center tw-text-base tw-text-red-600">
        {GENERIC_ERROR_MESSAGE}
      </div>
    );
  }

  return (
    <LoadingWrapper isLoading={isPending}>
      <div>
        <div className="tw-mb-5 tw-flex tw-w-full tw-gap-4">
          <TripMarkdownCard content={data?.data?.summary.markdown} />
          <TravelAdvisoryCard travelAdvisory={data?.data?.travelAdvisory} />
        </div>
        {data?.data?.trips.map((trip: TripDetails) => (
          <TripDetailsCard trip={trip} key={referenceId} />
        ))}
      </div>
    </LoadingWrapper>
  );
};

export default TripDetailsPage;
