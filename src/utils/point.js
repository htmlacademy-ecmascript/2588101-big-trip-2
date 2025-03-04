import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

function humanizeDate(date) {
  return date ? dayjs.utc(date).format(DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs.utc(time).format(TIME_FORMAT) : '';
}

function humanizeDateTime(dateTime) {
  return dateTime ? dayjs.utc(dateTime).format(DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const difference = dayjs.duration(date1.diff(date2));

  const format = 'DD[D] HH[H] mm[M]';

  return difference.format(format).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
}

function isEventInFuture(date) {
  return date && dayjs.utc().isAfter(date, 'D');
}

function isEventInPresent(date) {
  return date && dayjs.utc().isSame(date, 'D');
}

function isEventInPast(date) {
  return date && dayjs.utc().isBefore(date, 'D');
}

export {humanizeDate, getTimeDifference, humanizeDateTime , humanizeTime, isEventInFuture, isEventInPresent, isEventInPast};
