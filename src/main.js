import NewEventButtonView from './view/new-event-button-view.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import {render} from './framework/render.js';
import {END_POINT, AUTHORIZATION} from './const.js';

const headerContainer = document.querySelector('.trip-main');
const filtersContainer = headerContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: headerContainer,
  pointsModel
});

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

headerPresenter.init();
tripPresenter.init();
filterPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newEventButtonElement, headerContainer);

    if (!pointsModel.isDataLoaded) {
      newEventButtonElement.element.disabled = true;
    }
  });
