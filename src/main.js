import HeaderInfoView from './view/header-info-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import {render, RenderPosition} from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import {END_POINT, AUTHORIZATION} from './const.js';

const headerContainer = document.querySelector('.trip-main');
const filtersContainer = headerContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  container: tripEventsContainer,
  pointsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

const newEventButtonElement = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonElement.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createEvent();
  newEventButtonElement.element.disabled = true;
}

render(newEventButtonElement, headerContainer);
render (new HeaderInfoView(), headerContainer, RenderPosition.AFTERBEGIN);

tripPresenter.init();
filterPresenter.init();
pointsModel.init();
