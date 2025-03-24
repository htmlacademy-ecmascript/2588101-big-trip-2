import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function humanizeDateTime(dateTime) {
  return dateTime ? dayjs(dateTime).format(DATE_TIME_FORMAT) : '';
}

function getTimeDifference(firstDate, secondDate) {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const difference = dayjs.duration(date1.diff(date2));

  const format = 'DD[D] HH[H] mm[M]';

  return difference.format(format).replace(/\b00D 00H\b/, '').replace(/\b00D\b/, '');
}

function isPointInFuture(pointDate) {
  return pointDate && dayjs().isBefore(pointDate, 'D');
}

function isPointInPast(pointDate) {
  return pointDate && dayjs().isAfter(pointDate, 'D');
}

function isPointSameOrAfter(pointDate) {
  return pointDate && dayjs().isSameOrAfter(pointDate, 'D');
}

function isPointSameOrBefore(pointDate) {
  return pointDate && dayjs().isSameOrBefore(pointDate, 'D');
}

function sortPointDay(dayA, dayB) {
  return dayjs(dayA.dateFrom).diff(dayjs(dayB.dateFrom));
}

function sortPointTime(timeA, timeB) {
  return dayjs(timeA.dateFrom).diff(dayjs(timeA.dateTo)) - dayjs(timeB.dateFrom).diff(dayjs(timeB.dateTo));
}

function sortPointPrice(priceA, priceB) {
  return priceB.basePrice - priceA.basePrice;
}

export {humanizeDate, getTimeDifference, humanizeDateTime , humanizeTime, isPointInFuture, isPointInPast,
  isPointSameOrAfter, isPointSameOrBefore, sortPointDay, sortPointTime, sortPointPrice};
