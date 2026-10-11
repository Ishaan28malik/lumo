import { getDayjsInstance } from '../date';

const dateFilterComparator = (
  filterLocalDateAtMidnight: Date,
  cellValue: string
) => {
  const cellDate = getDayjsInstance(cellValue).toDate();

  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
  return 0;
};

export { dateFilterComparator };
