import {FilterTypes} from '../const.js';
import {isPointInFuture, isPointInPast, isPointSameOrAfter, isPointSameOrBefore} from '../utils/point.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.slice(),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointSameOrAfter(point.dateFrom) && isPointSameOrBefore(point.dateTo)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

export {filter};
