import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import {render, replace, RenderPosition} from '../framework/render.js';

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

  #renderRoutePoint(point, offers, destinations) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const routePointElement = new RoutePointView({
      point,
      offers,
      destinations,
      onUnrollBtnClick: () => {
        replaceRoutePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editFormElement = new EditFormView({
      point,
      offers,
      destinations,
      onRollupBtnClick: () => {
        replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceRoutePointToEditForm() {
      replace(editFormElement, routePointElement);
    }

    function replaceEditFormToRoutePoint() {
      replace(routePointElement, editFormElement);
    }

    render(routePointElement, this.#pointListElement.element);
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
