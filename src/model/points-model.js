import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';
import {getRandomPoints} from '../mock/points.js';
import {POINT_COUNT} from '../const.js';

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoints);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
