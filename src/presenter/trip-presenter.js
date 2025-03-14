import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import RoutePointPresenter from './route-point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointDay, sortPointTime, sortPointPrice} from '../utils/point.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #sortElement = null;

  #routePoints = [];
  #offers = [];
  #destinations = [];

  #pointListElement = new RoutePointListView();
  #noRoutePointElement = new NoRoutePointView();
  #routePointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#routePoints = [...this.#pointsModel.points];
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#routePoints.sort(sortPointDay);

    this.#renderTripBoard();
    this.#renderSort();
    this.#sortElement.replaceDefaultSort();
  }


  #handleModeChange = () => {
    this.#routePointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleRoutePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#routePointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#routePoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#routePoints.sort(sortPointPrice);
        break;
      default:
        this.#routePoints.sort(sortPointDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearRoutePointList();
    this.#renderTripBoard();
  };

  #renderSort() {
    this.#sortElement = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortElement, this.#pointListElement.element, RenderPosition.AFTERBEGIN);
  }

  #renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter({
      container: this.#pointListElement.element,
      onDataChange: this.#handleRoutePointChange,
      onModeChange: this.#handleModeChange
    });
    routePointPresenter.init(point, this.#offers, this.#destinations);
    this.#routePointPresenters.set(point.id, routePointPresenter);
  }

  #renderNoRoutePoints() {
    render(this.#noRoutePointElement, this.#pointListElement.element, RenderPosition.AFTERBEGIN);
  }

  #clearRoutePointList() {
    this.#routePointPresenters.forEach((presenter) => presenter.destroy());
    this.#routePointPresenters.clear();
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
  }
}
