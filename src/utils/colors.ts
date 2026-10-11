import '../../src/styles/delayLegend.css';
import { colors } from '../constants/colors';

export const getDelayColor = (delayInMins: number) => {
  let color;
  if (delayInMins > 0 && delayInMins < 30) {
    color = colors.SHORT_TIME_DELAY;
  } else if (delayInMins >= 30 && delayInMins < 60) {
    color = colors.MEDIUM_TIME_DELAY;
  } else if (delayInMins >= 60 && delayInMins < 120) {
    color = colors.LONG_TIME_DELAY;
  } else if (delayInMins >= 120) {
    color = colors.EXTRA_LONG_TIME_DELAY;
  } else {
    color = colors.DEFAULT;
  }

  return color;
};

export const historyCardColorMapping: { [key: string]: string } = {
  txt3: '#924df6', // For < 30 min
  txt2: '#2da1d7', // For 30-60 min
  txt1: '#14cc99', // For 1-2 hr
  txt4: '#df2eab', // For 2+ hr
  txt5: '#cccccc', // For No data
};
export const getDelayClass = (delayValue: number): string => {
  if (delayValue < 30) {
    return 'clr1-text';
  } else if (delayValue >= 30 && delayValue <= 59) {
    return 'clr2-text';
  } else if (delayValue >= 60 && delayValue <= 119) {
    return 'clr3-text';
  } else if (delayValue > 119) {
    return 'clr4-text';
  }
  return 'clr5-text'; //No data
};

export const getAvgRiskScoreClass = (avgRiskScore: number): string => {
  if (avgRiskScore < 8) {
    return 'clr1-risk-text';
  }
  return 'clr2-risk-text';
};
