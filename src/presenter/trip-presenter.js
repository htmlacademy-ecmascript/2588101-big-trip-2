import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import RoutePointPresenter from './route-point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;

  #pointListElement = new RoutePointListView();
  #sortElement = new SortView();
  #noRoutePointElement = new NoRoutePointView();

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

    this.#renderTripBoard();
  }

  #renderSort() {
    render(this.#sortElement, this.#pointListElement.element, RenderPosition.AFTERBEGIN);
  }

  #renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter({
      container: this.#pointListElement.element,
    });
    routePointPresenter.init(point, this.#offers, this.#destinations);
  }

  #renderRoutePoints(from, to) {
    this.#routePoints
      .slice(from, to)
      .forEach((routePoint) => this.#renderRoutePoint(routePoint));
  }

  #renderNoRoutePoints() {
    render(this.#noRoutePointElement, this.#pointListElement.element, RenderPosition.AFTERBEGIN);
  }

  #renderTripBoard() {
    render(this.#pointListElement, this.#container);

    if (this.#routePoints.length === 0) {
      this.#renderNoRoutePoints() ;
      return;
    }

    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i], this.#offers, this.#destinations);
    }

    this.#renderSort();
  }
}
