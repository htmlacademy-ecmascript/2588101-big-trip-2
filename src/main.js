import FilterView from './view/filter-view.js';
import HeaderInfoView from './view/header-info-view.js';
import {render} from './render.js';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = headerContainer.querySelector('.trip-controls__filters');

render (new FilterView(), filterContainer);
render (new HeaderInfoView(), headerContainer, 'afterbegin');
