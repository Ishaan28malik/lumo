import { getDayjsInstance } from '../date';

type ComparatorType = 'numeric' | 'string' | 'date';

const createComparator = <T>(
  key: keyof T,
  comparatorType: ComparatorType = 'string'
) => {
  return (a: T, b: T): number => {
    const aValue = a[key];
    const bValue = b[key];

    switch (comparatorType) {
      case 'numeric':
      case 'string':
        return compareStringsOrNumbers(
          aValue as number | string,
          bValue as number | string
        );
      case 'date':
        return compareDates(aValue as string, bValue as string);
      default:
        return 0;
    }
  };
};

const compareStringsOrNumbers = (
  a: string | number,
  b: string | number
): number => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const compareDates = (a: string, b: string): number => {
  const dateA = getDayjsInstance(a).valueOf();
  const dateB = getDayjsInstance(b).valueOf();

  if (dateA === dateB) return 0;
  return dateA > dateB ? 1 : -1;
};

export { createComparator };
