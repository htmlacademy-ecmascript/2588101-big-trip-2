import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {POINT_TYPES, NEW_EVENT} from '../const.js';
import {firstLetterCap} from '../utils/common.js';
import {humanizeDateTime} from '../utils/point.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createPicturesTemplate(destination) {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${destination?.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
  </div>
</div>`;
}

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
           name="offers" value="${typeOffer.id}" ${checkedOffers}>
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

function createFormTemplate(point, newEvent, offers, destinations) {
  const {basePrice, type, dateFrom, dateTo, isDisabled, isSaving, isDeleting} = point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination);

  const pointTypeTemplate = createPointTypeTemplate(type);
  const typeOfferTemplate = createTypeOfferTemplate(point, offers);
  const destinationListTemplate = createDestinationListTemplate(destinations);
  const picturesTemplate = createPicturesTemplate(pointDestination);

  const humanizedTimeFrom = humanizeDateTime(dateFrom);
  const humanizedTimeTo = humanizeDateTime(dateTo);

  const isSubmitDisabled = (dateFrom === null || dateTo === null);

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} value="${he.encode(pointDestination?.name ?? '')}" list="destination-list-1" required>
                    <datalist id="destination-list-1">
                      ${destinationListTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''} value="${humanizedTimeFrom}" required>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''} value="${humanizedTimeTo}" required>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="1" max="100000" step="1" value="${basePrice}" required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${(isSubmitDisabled || isDisabled) ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${(newEvent ? 'Cancel' : null) || (isDeleting ? 'Deleting...' : 'Delete')}</button>
                  ${!newEvent ? `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>` : ''}
                </header>
                    ${typeOfferTemplate}
              ${pointDestination?.description.length || pointDestination?.pictures.length ? `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${pointDestination.description}</p>
                ${pointDestination.pictures.length ? picturesTemplate : ''}
              </section>` : ''}
                </section>
              </form>
            </li>`);
}

export default class EditFormView extends AbstractStatefulView {
  #newEvent = null;
  #offers = null;
  #destinations = null;
  #rollupBtnClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({point = NEW_EVENT, newEvent, offers, destinations, onRollupBtnClick, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#newEvent = newEvent;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#rollupBtnClick = onRollupBtnClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(this._state, this.#newEvent, this.#offers, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    if (!this.#newEvent) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupBtnHandler);
    }
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationHandler);
    this.element.querySelector('.event__details').addEventListener('change', this.#pointOffersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#pointPriceHandler);

    this.#setDatepicker();
  }

  #rollupBtnHandler = (evt) => {
    evt.preventDefault();
    this.#rollupBtnClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #pointTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #pointDestinationHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (newDestination === undefined) {
      return;
    }
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #pointOffersHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = [...this.element.querySelectorAll('input[name="offers"]:checked')]
      .map((offer) => offer.value);
    this._setState({
      offers: checkedOffers
    });
  };

  #pointPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10),
    });
  };

  #dateFromHandler = ([dateFrom]) => {
    this._setState({
      dateFrom: dateFrom,
    });
    this.#datepickerTo.set('minDate', dateFrom);
  };

  #dateToHandler = ([dateTo]) => {
    this._setState({
      dateTo: dateTo,
    });
    this.#datepickerFrom.set('maxDate', dateTo);
  };

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      minuteIncrement: 1,
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/y H:i',
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToHandler,
        minDate: this._state.dateFrom
      }
    );
  }

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
