import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render, replace} from '../framework/render.js';

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

    this.#renderTripBoard();
  }

  #renderRoutePoint(point, offers, destinations) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToRoutePoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointElement = new RoutePointView({
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
      replace(editFormElement, pointElement);
    }

    function replaceEditFormToRoutePoint() {
      replace(pointElement, editFormElement);
    }

    render(pointElement, this.#pointListElement.element);
    render(editFormElement, this.#pointListElement.element);
  }

  #renderTripBoard() {
    render(new SortView(), this.#container);
    render(this.#pointListElement, this.#container);

    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i], this.#offers, this.#destinations);
    }
  }
}
