const POINT_COUNT = 5;

const POINT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'];

const NEW_EVENT = {
  'id': '01',
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export {POINT_COUNT, POINT_TYPES, FilterType, SortType, UserAction, UpdateType, NEW_EVENT, Mode, NoPointsTextType, Method};
