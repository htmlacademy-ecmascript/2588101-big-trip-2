import {FilterTypes} from '../const.js';
import {isPointInFuture, isPointInPast, isPointSameOrAfter, isPointSameOrBefore} from '../utils/point.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.slice(),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.poinTimeFrom)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointSameOrBefore(point.poinTimeFrom) && isPointSameOrAfter(point.pointTimeTo)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointInPast(point.pointTimeTo)),
};

export {filter};
