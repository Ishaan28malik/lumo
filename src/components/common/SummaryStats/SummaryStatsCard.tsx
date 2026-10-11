import { clsx } from 'clsx';
import { useMemo } from 'react';

import { OrgSummaryStats } from '../../../types/booking';
import BriefCaseIcon from '../IconWrapper/BriefCaseIcon';
import CancelledIcon from '../IconWrapper/CancelledIcon';
import ChartIncreasingIcon from '../IconWrapper/ChartIncreasingIcon';
import DangerIcon from '../IconWrapper/DangerIcon';
import DelayedIcon from '../IconWrapper/DelayedIcon';
import MissedConnectionIcon from '../IconWrapper/MissedConnectionIcon';
import QuestionMarkIcon from '../IconWrapper/QuestionMarkIcon';
import UserIcon from '../IconWrapper/UserIcon';
import CustomLoader from '../Loader/CustomLoader';

type StatItemProps = {
  icon: JSX.Element;
  value: number;
  label: string;
  percentage?: string;
  isRiskScore?: boolean;
  inline?: boolean;
};

const StatItem = ({
  icon,
  value,
  label,
  percentage,
  isRiskScore,
  inline,
}: StatItemProps) => (
  <div>
    <div className={clsx(inline && 'tw-text-xl')}>{icon}</div>
    <div
      className={clsx(inline && 'tw-flex tw-items-center tw-justify-between')}
    >
      <div className={clsx(!inline && 'tw-py-1')}>
        <span className="tw-font-semibold">{value}</span>
        {!isRiskScore && percentage && (
          <span className="tw-pl-1">({percentage}%)</span>
        )}
        {isRiskScore && <span className="tw-text-xs"> /10</span>}
      </div>
      <p className={clsx(inline ? 'tw-pl-1 tw-text-base' : 'tw-text-xs')}>
        {label}
      </p>
    </div>
  </div>
);

const SummaryStatsCard = ({
  summaryStatsData,
  isLoading,
}: {
  summaryStatsData: OrgSummaryStats[];
  isLoading: boolean;
}) => {
  const defaultStats: OrgSummaryStats = {
    totalTrips: 0,
    totalTravelers: 0,
    path: '',
    name: '',
    tripStatistics: {
      cancelledTrips: 0,
      delayedTrips: 0,
      missedConnections: 0,
      tripsAtRisk: 0,
      travelAlerts: 0,
      averageRiskScore: 0,
    },
  };

  const {
    totalTrips = 0,
    totalTravelers = 0,
    tripStatistics: {
      cancelledTrips = 0,
      delayedTrips = 0,
      missedConnections = 0,
      tripsAtRisk = 0,
      travelAlerts = 0,
      averageRiskScore = 0,
    } = {},
  } = summaryStatsData.length > 0 ? summaryStatsData[0] : defaultStats;

  const calculatePercentage = (categoryTrips: number, totalTrips: number) =>
    totalTrips === 0 ? '0.0' : ((categoryTrips / totalTrips) * 100).toFixed(1);

  const {
    cancelledTripsPct,
    delayedTripsPct,
    missedConnectionsPct,
    tripsAtRiskPct,
    travelAlertsPct,
  } = useMemo(() => {
    return {
      cancelledTripsPct: calculatePercentage(cancelledTrips, totalTrips),
      delayedTripsPct: calculatePercentage(delayedTrips, totalTrips),
      missedConnectionsPct: calculatePercentage(missedConnections, totalTrips),
      tripsAtRiskPct: calculatePercentage(tripsAtRisk, totalTrips),
      travelAlertsPct: calculatePercentage(travelAlerts, totalTrips),
    };
  }, [
    cancelledTrips,
    delayedTrips,
    missedConnections,
    tripsAtRisk,
    travelAlerts,
    totalTrips,
  ]);

  if (isLoading && summaryStatsData.length === 0) {
    return <CustomLoader />;
  }

  return (
    <div className="tw-w-2/5 tw-rounded tw-border tw-border-gray-200 tw-p-3 tw-text-center">
      <div className="tw-flex tw-justify-around tw-pb-1">
        <StatItem
          icon={<BriefCaseIcon />}
          value={totalTrips}
          label="Trips"
          inline
        />
        <StatItem
          icon={<UserIcon />}
          value={totalTravelers}
          label="Travelers"
          inline
        />
      </div>
      <div className="tw-border-t-2 tw-border-gray-200 tw-px-4 tw-pt-2">
        <h5 className="tw-pb-1 tw-text-sm tw-font-semibold">
          Real Time Status
        </h5>
        <hr className="tw-border-2 tw-border-red-500" />
        <div className="tw-my-1 tw-flex tw-justify-between tw-px-8">
          <StatItem
            icon={<CancelledIcon />}
            value={cancelledTrips}
            percentage={cancelledTripsPct}
            label="Cancelled"
          />
          <StatItem
            icon={<DelayedIcon />}
            value={delayedTrips}
            percentage={delayedTripsPct}
            label="Delayed 1 hr+"
          />
          <StatItem
            icon={<MissedConnectionIcon />}
            value={missedConnections}
            percentage={missedConnectionsPct}
            label="Missed Connections"
          />
        </div>
        <div className="tw-mt-4 tw-flex tw-w-full tw-justify-around tw-gap-5">
          <div className="tw-w-1/2">
            <h5 className="tw-pb-1 tw-text-sm tw-font-semibold">Predictions</h5>
            <hr className="tw-border-2 tw-border-orange-500" />
            <div className="tw-my-1 tw-flex tw-justify-around">
              <StatItem
                icon={<QuestionMarkIcon />}
                value={tripsAtRisk}
                percentage={tripsAtRiskPct}
                label="Trips at Risk"
              />
              <StatItem
                icon={<ChartIncreasingIcon />}
                value={averageRiskScore}
                label="Avg Risk Score"
                isRiskScore
              />
            </div>
          </div>
          <div className="tw-w-1/2">
            <h5 className="tw-pb-1 tw-text-sm tw-font-semibold">Waivers</h5>
            <hr className="tw-border-2 tw-border-yellow-400" />
            <div className="tw-my-1">
              <StatItem
                icon={<DangerIcon />}
                value={travelAlerts}
                percentage={travelAlertsPct}
                label="Travel Alerts"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatsCard;
