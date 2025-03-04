import {FilterTypes} from '../const.js';
import {isEventInFuture, isEventInPresent, isEventInPast} from '../utils/point.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isEventInFuture(point.pointDateFrom)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isEventInPresent(point.pointDateFrom)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isEventInPast(point.pointDateFrom)),
};

export {filter};
