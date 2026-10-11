import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import {
  DAY_MONTH_FORMAT,
  HOURS_MINS_AMPM_FORMAT,
} from '../constants/dateFormats';
import { getTimezoneOffset } from './getTimezoneOffset';

dayjs.extend(duration);
dayjs.extend(utc);

export const convertMinsToHoursAndMins = (totalMinutes: number) => {
  const durationObj = dayjs.duration(totalMinutes, 'minutes');
  const hours = Math.floor(durationObj.asHours());
  const minutes = durationObj.minutes();

  if (!hours && !minutes) return;

  if (hours === 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${minutes} min`;
};

export const formatDateToDayMonth = (dateString: string) => {
  return preventTimeConversionToLocal(dateString).format(DAY_MONTH_FORMAT);
};

export const getTimeFromDateTime = (dateString: string) => {
  return dayjs(dateString).format(HOURS_MINS_AMPM_FORMAT);
};

export const calculateDateDifferenceInMins = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diff = dayjs.duration(endDate.diff(startDate));
  const minutes = Math.floor(diff.asMinutes());

  return minutes;
};

export const calculateDateDifference = (start: string, end: string) => {
  const diff = calculateDateDifferenceInMins(start, end);

  return convertMinsToHoursAndMins(diff);
};

const preventTimeConversionToLocal = (date: string) => {
  const timezoneOffset = getTimezoneOffset(date);
  if (timezoneOffset) {
    return dayjs(date).utcOffset(timezoneOffset);
  }
  return dayjs(date);
};

const formateDate = (date: string, format: string) => {
  return preventTimeConversionToLocal(date).format(format);
};

const getDayjsInstance = (date: string): Dayjs => {
  return dayjs(date);
};

const convertToJsDate = (date: string): Date => {
  return dayjs(date).toDate();
};

const getCurrentTime = () => dayjs();

export const isWithinDelay = (
  timestamp: string,
  delay: number,
  currentTime = getCurrentTime()
) => {
  const timestampDate = getDayjsInstance(timestamp);

  if (!timestampDate.isValid()) {
    return false;
  }

  const startOfCurrentDay = currentTime.startOf('day');
  const startOfTimestampDay = timestampDate.startOf('day');

  const daysDifference = startOfCurrentDay.diff(startOfTimestampDay, 'days');

  return daysDifference <= delay && daysDifference >= 0;
};

export { formateDate, getDayjsInstance, convertToJsDate, getCurrentTime };
