import {render, remove, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import EditFormView from '../view/edit-form-view.js';

export default class NewEventPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #editFormElement = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(pointsModel) {
    if (this.#editFormElement !== null) {
      return;
    }

    this.#editFormElement = new EditFormView({
      newEvent: true,
      offers: pointsModel.offers,
      destinations: pointsModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#editFormElement, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editFormElement === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editFormElement);
    this.#editFormElement = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
