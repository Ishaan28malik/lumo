type FlightData = {
  historical_performance: {
    arrival_delay: number[];
  };
};

export const flightData = {
  historical_performance: {
    arrival_delay: [
      7, -25, 11, -16, -7, -10, 10002, 38, 4, 4, 7, 152, 8, 7, 19, -14, 80, -2,
      -19, 120, 82, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000,
      10000, 10000, 10000, 10000, 8, -1, 103, 19, 8, -4, 10, -1, 10000, 10000,
      180, 82, 99, -3, 28, 102, 80, 8, 117, 9, 91, 8, 157, 66, 27, 107, 60,
    ],
  },
};

export const getComprehensiveDummyData = (flightData: FlightData) => {
  return flightData.historical_performance.arrival_delay;
};

export const delayLegendData = {
  lumoIndex: '8.2',
  lumoSubIndex: '/10',
  lumoRisk: 'HIGH',
  riskText:
    'Flight may be delayed because of airport conditions at Boston and a late inbound flight.',
  legendItems: [
    { val: '< 30 min', clrClassName: 'clr1', percentage: '95%' },
    { val: '30-60 min', clrClassName: 'clr2', percentage: '5%' },
    { val: '1-2 hr', clrClassName: 'clr3', percentage: '5%' },
    { val: '2+ hr', clrClassName: 'clr4', percentage: '10%' },
  ],
};
