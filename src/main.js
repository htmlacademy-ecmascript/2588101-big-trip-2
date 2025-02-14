import FilterView from './view/filter-view.js';
import HeaderInfoView from './view/header-info-view.js';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = headerContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({container: tripEventsContainer});

render (new FilterView(), filterContainer);
render (new HeaderInfoView(), headerContainer, 'afterbegin');

tripPresenter.init();
