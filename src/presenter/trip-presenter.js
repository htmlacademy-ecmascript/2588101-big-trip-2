import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../framework/render.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;

  #pointListElement = new RoutePointListView();

  #routePoints = [];
  #offers = [];
  #destinations = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    render(new SortView(), this.#container);
    render(this.#pointListElement, this.#container);

    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i], this.#offers, this.#destinations);
    }
  }

  #renderRoutePoint(point, offers, destinations) {
    const pointElement = new RoutePointView({point, offers, destinations});
    const editFormElement = new EditFormView({point, offers, destinations});

    render(pointElement, this.#pointListElement.element);
    render(editFormElement, this.#pointListElement.element);
  }
}
