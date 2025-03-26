import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import RoutePointPresenter from './route-point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {SortType} from '../const.js';
import {sortPointDay, sortPointTime, sortPointPrice} from '../utils/point.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #sortElement = null;

  #offers = [];
  #destinations = [];

  #pointListElement = new RoutePointListView();
  #noRoutePointElement = new NoRoutePointView();
  #routePointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointDay);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
    }
    return this.#pointsModel.points;
  }

  init() {
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#renderTripBoard();
    this.#renderSort();
    this.#sortElement.replaceDefaultSort();
  }


  #handleModeChange = () => {
    this.#routePointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModeEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
      onDataChange: this.#handleViewAction,
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

    if (this.points.length === 0) {
      this.#renderNoRoutePoints() ;
      return;
    }

    for (let i = 0; i < this.points.length; i++) {
      this.#renderRoutePoint(this.points[i], this.#offers, this.#destinations);
    }
  }
}
