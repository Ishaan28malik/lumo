export const getTooltipProps = (item: number) => {
  if (item) {
    if (item < 30) {
      return ['< 30 min', 'txt1'];
    } else if (item < 60) {
      return ['30 - 60 min', 'txt2'];
    } else if (item < 120) {
      return ['1 - 2 hr', 'txt3'];
    } else if (item < 10000) {
      return ['2+ hr', 'txt4'];
    } else if (item === 10002) {
      return ['No data', 'txt5'];
    } else {
      return ['No data', 'txt5'];
    }
  }
  return ['No data', 'txt5'];
};
