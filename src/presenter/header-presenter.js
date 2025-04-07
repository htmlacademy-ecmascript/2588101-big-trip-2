import {render, replace, remove, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info-view.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #pointsModel = null;
  #headerInfoElement = null;

  constructor({headerContainer, pointsModel}) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevHeaderInfoElement = this.#headerInfoElement;

    this.#headerInfoElement = new HeaderInfoView(this.#pointsModel);

    if (prevHeaderInfoElement === null) {
      render(this.#headerInfoElement, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerInfoElement, prevHeaderInfoElement);
    remove(prevHeaderInfoElement);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
