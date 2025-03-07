import EditFormView from '../view/edit-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class RoutePointPresenter {
  #container = null;
  #routePointElement = null;
  #editFormElement = null;
  #point = null;
  #offers = null;
  #destinations = null;

  constructor({container}) {
    this.#container = container;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevRoutePointElement = this.#routePointElement;
    const prevEditFormElement = this.#editFormElement;

    this.#routePointElement = new RoutePointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onUnrollBtnClick: this.#unrollBtnClick,
    });

    this.#editFormElement = new EditFormView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollupBtnClick: this.#rollupBtnClick,
      onFormSubmit: this.#formSubmitEvent,
    });

    if (prevRoutePointElement === null || prevEditFormElement === null) {
      render(this.#routePointElement, this.#container);
      return;
    }

    if (this.#container.contains(prevRoutePointElement.element)) {
      replace(this.#routePointElement, prevRoutePointElement);
    }

    if (this.#container.contains(prevEditFormElement.element)) {
      replace(this.#editFormElement, prevEditFormElement);
    }

    remove(prevRoutePointElement);
    remove(prevEditFormElement);
  }

  destroy() {
    remove(this.#routePointElement);
    remove(this.#editFormElement);
  }

  #replaceRoutePointToEditForm() {
    replace(this.#editFormElement, this.#routePointElement);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToRoutePoint() {
    replace(this.#routePointElement, this.#editFormElement);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToRoutePoint();
    }
  };

  #unrollBtnClick = () => {
    this.#replaceRoutePointToEditForm();
  };

  #rollupBtnClick = () => {
    this.#replaceEditFormToRoutePoint();
  };

  #formSubmitEvent = () => {
    this.#replaceEditFormToRoutePoint();
  };

}
