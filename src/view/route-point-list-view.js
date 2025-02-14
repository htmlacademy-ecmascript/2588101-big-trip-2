import {createElement} from '../render';

function createRoutePointList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class RoutePointListView {
  getTemplate() {
    return createRoutePointList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
