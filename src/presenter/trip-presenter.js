import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import RoutePointPresenter from './route-point-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortPointDay, sortPointTime, sortPointPrice} from '../utils/point.js';
import {filter} from '../utils/filter.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #sortElement = null;
  #filterModel = null;
  #noRoutePointElement = null;
  #newEventPresenter = null;

  #offers = [];
  #destinations = [];

  #pointListElement = new RoutePointListView();
  #routePointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({container, pointsModel, filterModel, onNewEventDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      pointListContainer: this.#pointListElement.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderTripBoard();
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.#pointsModel);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#routePointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#routePointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard();
        this.#renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderTripBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripBoard();
    this.#renderTripBoard();
  };

  #renderSort() {
    this.#sortElement = new SortView({
      currentSortType: this.#currentSortType,
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

  #renderRoutePoints(points) {
    points.forEach((point) => this.#renderRoutePoint(point));
  }

  #renderNoRoutePoints() {
    this.#noRoutePointElement = new NoRoutePointView({
      filterType: this.#filterType
    });

    render(this.#noRoutePointElement, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#routePointPresenters.forEach((presenter) => presenter.destroy());
    this.#routePointPresenters.clear();

    remove(this.#sortElement);

    if (this.#noRoutePointElement) {
      remove(this.#noRoutePointElement);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTripBoard() {
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoRoutePoints() ;
      return;
    }

    this.#renderSort();
    render(this.#pointListElement, this.#container);
    this.#renderRoutePoints(points);
  }
}
