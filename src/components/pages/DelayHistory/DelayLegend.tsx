import React, { useCallback } from 'react';

import '../../../styles/delayLegend.css';

const Bar: React.FC<{ className: string; percentage: string }> = (props) => {
  let reducedPercentage;
  const num = parseInt(props.percentage, 10);

  if (props.percentage.includes('>')) {
    reducedPercentage = `> ${(num * 0.5).toFixed(2)}%`;
  } else if (props.percentage.includes('<')) {
    reducedPercentage = `< ${(num * 0.8).toFixed(2)}%`;
  } else {
    reducedPercentage = (num * 0.5).toFixed(2) + '%';
  }

  return (
    <div
      className={'legend-bar ' + props.className}
      style={{ width: reducedPercentage }}
    />
  );
};

export const DelayLegendItem: React.FC<{
  clrClassName: string;
  val: string;
  percentage: string;
}> = (props) => {
  const getPercentageDisplay = useCallback((percentage: string) => {
    const num = parseInt(percentage, 10);
    if (num > 90) {
      return `> ${percentage}`;
    } else if (num < 10) {
      return `< ${percentage}`;
    } else {
      return percentage;
    }
  }, []);

  return (
    <div className="delay-legend-item">
      <span className="right-elem">{props.val}</span>
      <Bar className={props.clrClassName} percentage={props.percentage} />
      <span className="percentage">
        {getPercentageDisplay(props.percentage)}
      </span>
    </div>
  );
};

interface DelayLegendProps {
  lumoIndex: string;
  lumoSubIndex: string;
  lumoRisk: string;
  riskText: string;
  legendItems: {
    val: string;
    clrClassName: string;
    percentage: string;
  }[];
}

const DelayLegend: React.FC<DelayLegendProps> = ({
  lumoIndex,
  lumoSubIndex,
  lumoRisk,
  riskText,
  legendItems,
}) => {
  return (
    <div className="delay-legend-container">
      <div className="lumo-index">
        <div className="index-label">LUMO INDEX</div>
        <div className="index-val-container">
          <div className="index-value tw-text-4xl">{lumoIndex}</div>
          <div className="subindex-value tw-mt-2 tw-text-xl">
            {lumoSubIndex}
          </div>
        </div>
        <div className="index-risk">
          <span className="tw-mr-1 tw-font-bold tw-text-black">{lumoRisk}</span>
          RISK
        </div>
      </div>
      <div className="risk-text tw-mx-4">{riskText}</div>
      <div className="delay-legend">
        {legendItems.map((item, index) => (
          <DelayLegendItem
            key={index}
            val={item.val}
            clrClassName={item.clrClassName}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
};
export default DelayLegend;
