
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  pointListElement = new RoutePointListView();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = this.pointsModel.getOffers();
    this.destinations = this.pointsModel.getDestinations();

    render(new SortView(), this.container);
    render(this.pointListElement, this.container);
    render(new EditFormView({point: this.points[0], offers: this.offers, destinations: this.destinations}), this.pointListElement.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new RoutePointView({point: this.points[i], offers: this.offers, destinations: this.destinations}), this.pointListElement.getElement());
    }
  }
}
