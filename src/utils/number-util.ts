export const convertDecimalToPercentage = (decimal: number) => {
  if (typeof decimal !== 'number') {
    return '';
  }
  const percentage = decimal * 100;
  return `${percentage}%`;
};
