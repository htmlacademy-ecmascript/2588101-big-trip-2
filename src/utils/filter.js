import {FilterType} from '../const.js';
import {isPointInFuture, isPointInPast, isPointSameOrAfter, isPointSameOrBefore} from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointSameOrAfter(point.dateFrom) && isPointSameOrBefore(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

export {filter};
