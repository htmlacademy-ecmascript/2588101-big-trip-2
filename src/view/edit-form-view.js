import AbstractView from '../framework/view/abstract-view.js';
import {POINT_TYPES} from '../const.js';
import {firstLetterCap, humanizeDateTime} from '../utils.js';

function createDestinationListTemplate(destinations) {
  return (destinations.map((destination) => `<option value="${destination.name}"></option>`).join(''));
}

function createTypeOfferTemplate(point, offers) {
  const typeOffers = offers.find((offer) => offer.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  return (
    `<section class="event__details">
  ${typeOffers.length ?
      `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">

   ${typeOffers.map((typeOffer) => {
      const checkedOffers = pointOffers.map((offer) => offer.id).includes(typeOffer.id) ? 'checked' : '';

      return (`<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-1" type="checkbox"
           name="event-offer-${typeOffer.title}" ${checkedOffers}>
             <label class="event__offer-label" for="event-offer-${typeOffer.title}-1">
               <span class="event__offer-title">${typeOffer.title}</span>
                  &plus;&euro;&nbsp;
               <span class="event__offer-price">${typeOffer.price}</span>
             </label>
       </div>`
      );
    }).join('')}
        </div>
     </section>` : ''}`
  );
}

function createPointTypeTemplate(type) {
  return (POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
        <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${firstLetterCap(pointType)}</label>
    </div>`
  )).join(''));
}

function createEditFormTemplate(point, offers, destinations) {
  const {basePrice, type, dateFrom, dateTo} = point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const {description, name} = pointDestination;

  const pointTypeTemplate = createPointTypeTemplate(type);
  const typeOfferTemplate = createTypeOfferTemplate(point, offers);
  const destinationListTemplate = createDestinationListTemplate(destinations);

  const humanizedTimeFrom = humanizeDateTime(dateFrom);
  const humanizedTimeTo = humanizeDateTime(dateTo);

  return (`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                      ${pointTypeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationListTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizedTimeFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizedTimeTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                    ${typeOfferTemplate}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>
                </section>
              </form>
            </li>`);
}

export default class EditFormView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #rollupBtnClick = null;
  #formSubmitEvent = null;

  constructor({point, offers, destinations, onRollupBtnClick, onFormSubmit}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#rollupBtnClick = onRollupBtnClick;
    this.#formSubmitEvent = onFormSubmit;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditFormTemplate(this.#point, this.#offers, this.#destinations);
  }

  #rollupBtnHandler = (evt) => {
    evt.preventDefault();
    this.#rollupBtnClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#formSubmitEvent();
  };
}
