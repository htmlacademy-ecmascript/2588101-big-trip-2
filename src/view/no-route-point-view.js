import AbstractView from '../framework/view/abstract-view.js';
import {NoPointsTextType} from '../const.js';

function createNoRoutePointTemplate(filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noPointsTextValue}</p>`
  );
}

export default class NoRoutePointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoRoutePointTemplate(this.#filterType);
  }
}
