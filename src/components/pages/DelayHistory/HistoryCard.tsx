import { Box, Grid, Tooltip as MuiTooltip } from '@mui/material';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import '../../../styles/historyCard.css';
import { historyCardColorMapping } from '../../../utils/colors';
import {
  delayLegendData,
  getComprehensiveDummyData,
} from '../../../utils/getHistoryDummydata';
import { getRenderChartItem } from '../../../utils/getRenderChartItems';
import { getTooltipProps } from '../../../utils/getTooltTipProps';
import DelayLegend from './DelayLegend';

interface DelayHistoryChartProps {
  data: number[];
  lastUpdated: string;
  hideTitle?: boolean;
}
interface RenderLiProps {
  key: number | undefined;
  className: string;
  value?: number;
}

const customToolTipStyle = {
  backgroundColor: '#ffffff',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  fontSize: '14px',
  padding: '10px',
  borderRadius: '4px',
};

export const DelayHistoryChart: React.FC<DelayHistoryChartProps> = ({
  data = [],
  lastUpdated,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverDate, setHoverDate] = useState<string | undefined>();
  const [hoverVal, setHoverVal] = useState<string | undefined>();
  const [hoverColor, setHoverColor] = useState<string | undefined>();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const delayCountRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reversedData = useMemo(() => [...data].reverse(), [data]);

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const index: number = (e.currentTarget as HTMLLIElement).value;
      const tpProps = getTooltipProps(reversedData[index]);
      const hoverVal = tpProps[0];
      const hoverColor = tpProps[1];
      const hoverDate = dayjs(lastUpdated)
        .subtract(index, 'day')
        .format('D MMM YYYY');
      setShowTooltip(true);
      setHoverDate(hoverDate);
      setHoverVal(hoverVal);
      setHoverColor(hoverColor);
    },
    [reversedData, lastUpdated]
  );

  const onMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const mouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const tooltipWidth = 140;
    const tooltipHeight = 100;
    const xPos =
      e.clientX + tooltipWidth > window.innerWidth
        ? e.clientX - tooltipWidth
        : e.clientX + 10;
    const yPos =
      e.clientY + tooltipHeight > window.innerHeight
        ? e.clientY - tooltipHeight
        : e.clientY + 10;
    setX(xPos);
    setY(yPos);
  }, []);

  const renderLi = useCallback(
    (props: RenderLiProps) => {
      return (
        <li
          {...props}
          value={props.key}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={mouseMove}
          className="chart-list-item ch-width"
        >
          <div className={props.className} />
        </li>
      );
    },
    [onMouseEnter, onMouseLeave, mouseMove]
  );

  const renderChart = useCallback(
    (data: number[]) => {
      if (data.length === 0) {
        return Array.from({ length: 60 }, (_, i) =>
          getRenderChartItem(10002, i, renderLi, delayCountRef)
        );
      } else {
        return data.map((item, index) =>
          getRenderChartItem(item, index, renderLi, delayCountRef)
        );
      }
    },
    [renderLi]
  );

  const getPercentageDelayval = useCallback(() => {
    const val = ' ' + ((delayCountRef.current * 100) / 60).toFixed(0);
    return (
      <Box className="tw-pb-5 tw-text-lg">
        <strong>30+</strong>
        {' minute delay'}
        <strong>{val}</strong>% of the time
      </Box>
    );
  }, []);

  delayCountRef.current = 0;

  return (
    <div className="hist-chart-cont lumo-charts">
      <Grid container className="tw-p-0">
        <Grid
          item
          xs={12}
          className="tw-no-gutter left-content tw-flex tw-justify-center"
        >
          {getPercentageDelayval()}
        </Grid>
        <div className="scroll-par">
          <div className="scroll" id="scroll" ref={scrollRef}>
            <ul className="d-hist-chart tw-w-[95%]" id="d-hist-chart">
              {renderChart(reversedData)}
            </ul>
            <ul className="tw-mr-8 tw-flex tw-justify-end tw-gap-x-[1.5vw] tw-text-base">
              {reversedData.map(
                (item, index) =>
                  index % 7 === 0 && (
                    <li key={index} className="date-label">
                      {dayjs(lastUpdated)
                        .subtract(index + 3, 'day')
                        .format('MMM-DD')}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </Grid>
      <MuiTooltip
        open={showTooltip}
        title={
          <div className="tw-rounded-md tw-bg-white tw-p-2 tw-text-base tw-text-black">
            <div
              style={{
                color: hoverColor && historyCardColorMapping[hoverColor],
              }}
            >
              {hoverDate}
            </div>
            <div className="val-cont">{hoverVal}</div>
            <div className="delay-txt tw-text-sm tw-text-gray-500">
              {hoverVal === 'No data' ? '' : 'Delay'}
            </div>
          </div>
        }
        placement="top"
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
          ],
        }}
        componentsProps={{
          tooltip: {
            sx: customToolTipStyle,
          },
        }}
      >
        <div className="tw-absolute" style={{ top: y, left: x }} />
      </MuiTooltip>
    </div>
  );
};

interface FlightData {
  historical_performance: {
    arrival_delay: number[];
  };
}

interface HistoryCardProps {
  flightData: FlightData;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ flightData }) => {
  const comprehensiveDummyData = getComprehensiveDummyData(flightData);
  const lastUpdated = dayjs().format();

  return (
    <Box>
      <Grid container className="tw-gap-2 tw-p-0">
        <Grid item xs={12} className="history-footer tw-mb-4">
          <DelayLegend
            lumoIndex={delayLegendData.lumoIndex}
            lumoSubIndex={delayLegendData.lumoSubIndex}
            lumoRisk={delayLegendData.lumoRisk}
            riskText={delayLegendData.riskText}
            legendItems={delayLegendData.legendItems}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="tw-rounded-lg tw-border tw-border-gray-200 tw-p-4"
        >
          <DelayHistoryChart
            data={comprehensiveDummyData}
            lastUpdated={lastUpdated}
            hideTitle={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoryCard;
