import AbstractView from '../framework/view/abstract-view.js';
import {sortPointDay} from '../utils/point.js';
import dayjs from 'dayjs';

function createHeaderInfoTemplate(pointsModel) {
  if (!pointsModel.points.length) {
    return '<section class="trip-main__trip-info  trip-info"></section>';
  }

  const sortedPoints = pointsModel.points.sort(sortPointDay);
  const getDestinationName = (destination) => pointsModel.destinations.find((dest) => dest.id === destination)?.name;

  const uniqDestinations = [];
  sortedPoints.forEach((element) => {
    if (element.destination !== uniqDestinations[uniqDestinations.length - 1]) {
      uniqDestinations.push(element.destination);
    }
  });

  const uniqDestinationNames = uniqDestinations.map((element) => getDestinationName(element));

  const firstPointName = uniqDestinationNames[0];
  const secondPointName = uniqDestinationNames.length === 3 ? `&mdash; ${uniqDestinationNames[1]}` : '';
  const lastPointName = uniqDestinationNames.length > 1 ? `&mdash; ${uniqDestinationNames[uniqDestinationNames.length - 1]}` : '';
  const dots = uniqDestinationNames.length > 3 ? '&mdash; ...' : '';

  const startDate = sortedPoints[0].dateFrom;
  const endDate = sortedPoints[sortedPoints.length - 1].dateTo;

  const humanizedStartDate = dayjs(startDate).format('D MMM');
  const humanizedEndDate = dayjs(endDate).format('D MMM');

  const totalSum = sortedPoints.reduce((accumulator, point) => {
    const allOffers = pointsModel.offers;
    const pointTypeOffers = allOffers.find((offer) => offer.type === point.type).offers;
    return accumulator + point.basePrice + point.offers
      .reduce((innerAccumulator, offerId) => innerAccumulator + pointTypeOffers
        .find((offer) => offer.id === offerId).price, 0);
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstPointName} ${secondPointName} ${dots} ${lastPointName} </h1>

              <p class="trip-info__dates">${humanizedStartDate}&nbsp;&mdash;&nbsp;${humanizedEndDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
            </p>
          </section>`;
}

export default class HeaderInfoView extends AbstractView {
  #pointsModel = null;

  constructor(pointsModel) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    return createHeaderInfoTemplate(this.#pointsModel);
  }
}
