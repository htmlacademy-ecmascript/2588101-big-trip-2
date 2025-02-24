import {destinations} from '../mock/destinations.js';
import {offers} from '../mock/offers.js';
import {getRandomPoints} from '../mock/points.js';

const POINT_COUNT = 5;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoints);
  offers = offers;
  destinations = destinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
