
import SortView from '../view/sort-view.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../render.js';

const ROUTE_POINT_AMOUNT = 3;

export default class TripPresenter {
  pointListElement = new RoutePointListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.pointListElement, this.container);
    render(new CreateFormView(), this.pointListElement.getElement());
    render(new EditFormView(), this.pointListElement.getElement());

    for (let i = 0; i < ROUTE_POINT_AMOUNT; i++) {
      render(new RoutePointView(), this.pointListElement.getElement());
    }
  }
}
