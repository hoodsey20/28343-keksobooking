'use strict';

var templateElement = document.querySelector('template');

var createOfferPin = function (offer) {
  var mapPinTemplate = templateElement.content.querySelector('.map__pin');
  var pin = mapPinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = offer.location.x + 'px';
  pin.style.top = offer.location.y - window.consts.MAP_PIN_HEIGHT / 2 + 'px';
  pinImg.src = offer.author.avatar;

  pin.addEventListener('click', function () {
    window.removeOfferCard();
    window.renderOfferCard(offer);
  });

  return pin;
};

var renderMapPins = function (offers) {
  var mapPinsContainerELement = document.querySelector('.map__pins');
  var mapPinsFragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    mapPinsFragment.appendChild(createOfferPin(offers[i]));
  }

  mapPinsContainerELement.appendChild(mapPinsFragment);
};

var generatedOffers = window.data.generateOffers(window.consts.OFFER_QUANTITY);
var mapElement = document.querySelector('.map');
var offerFormElement = document.querySelector('.notice__form');
var offerFormFieldsetElements = offerFormElement.querySelectorAll('fieldset');
var mainPinElement = document.querySelector('.map__pin--main');

var setActiveStateHandler = function () {
  offerFormElement.classList.remove('notice__form--disabled');
  mapElement.classList.remove('map--faded');
  for (var i = 0; i < offerFormFieldsetElements.length; i++) {
    offerFormFieldsetElements[i].disabled = false;
  }
};

var unsetActiveState = function () {
  offerFormElement.classList.add('notice__form--disabled');
  mapElement.classList.add('map--faded');
  for (var i = 0; i < offerFormFieldsetElements.length; i++) {
    offerFormFieldsetElements[i].disabled = true;
  }
  resetAllInvalidHighlighting();
  removeMapPins();
  window.removeOfferCard();
  mainPinElement.addEventListener('mouseup', addMapPinsHandler);
};

var removeMapPins = function () {
  var pinsElements = document.querySelectorAll('.map__pin');

  if (pinsElements.length < 2) {
    return;
  }

  pinsElements = Array.prototype.slice.call(pinsElements, 1);

  for (var i = 0; i < pinsElements.length; i++) {
    pinsElements[i].remove();
  }
};

var setAddress = function (xCoordinate, yCoordinate) {
  var adressInputElement = document.querySelector('#address');
  adressInputElement.value = Math.round(xCoordinate) + ', ' + Math.round(yCoordinate);
};

var mainPinMouseupHandler = function (evt) {
  var mainPinOffsetLeft = evt.currentTarget.offsetLeft;
  var mainPinOffsetTop = evt.currentTarget.offsetTop;
  var mainPinXCoordinate = mainPinOffsetLeft + window.consts.MAIN_PIN_WIDTH / 2;
  var mainPinYCoordinate = mainPinOffsetTop + window.consts.MAIN_PIN_HEIGHT + window.consts.MAIN_PIN_PEAK_HEIGHT;

  setAddress(mainPinXCoordinate, mainPinYCoordinate);
};

var addMapPinsHandler = function () {
  renderMapPins(generatedOffers);
  mainPinElement.removeEventListener('mouseup', addMapPinsHandler);
};

var submitBtnElement = offerFormElement.querySelector('.form__submit');
var resetBtnElement = offerFormElement.querySelector('.form__reset');
var inputElements = offerFormElement.querySelectorAll('input');
var roomsInputElement = offerFormElement.querySelector('#room_number');
var typeInputElement = offerFormElement.querySelector('#type');
var arrivalInputElement = offerFormElement.querySelector('#timein');
var departureInputElement = offerFormElement.querySelector('#timeout');

var highlightInvalidInput = function (input) {
  input.classList.add('invalid-value-input');
};

var resetInvalidHighlightingInput = function (input) {
  input.classList.remove('invalid-value-input');
};

var resetAllInvalidHighlighting = function () {
  var invalidInputs = offerFormElement.querySelectorAll('.invalid-value-input');
  for (var i = 0; i < invalidInputs.length; i++) {
    resetInvalidHighlightingInput(invalidInputs[i]);
  }
};

var checkDisabledOptions = function () {
  var selectElements = offerFormElement.querySelectorAll('select');

  for (var i = 0; i < selectElements.length; i++) {
    var selectedOptionElement = window.util.findOptionByValue(selectElements[i], selectElements[i].value);
    resetInvalidHighlightingInput(selectElements[i]);
    selectElements[i].setCustomValidity('');

    if (selectedOptionElement.disabled) {
      highlightInvalidInput(selectElements[i]);
      selectElements[i].setCustomValidity('Данный вариант не может быть принят');
    }
  }
};

var roomsInputHandler = function (evt) {
  var capacityInputElement = offerFormElement.querySelector('#capacity');
  var capacityOptionElements = capacityInputElement.querySelectorAll('option');
  var roomsInputValue = evt.target.value;

  switch (roomsInputValue) {
    case '1':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0', '2', '3']);
      break;
    case '2':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0', '3']);
      break;
    case '3':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0']);
      break;
    case '100':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['1', '2', '3']);
      break;
  }
};

var checkPricePerNight = function () {
  var lodgingType = typeInputElement.value;
  var priceInputElement = offerFormElement.querySelector('#price');

  switch (lodgingType) {
    case 'flat':
      priceInputElement.min = 1000;
      break;
    case 'bungalo':
      priceInputElement.min = 0;
      break;
    case 'house':
      priceInputElement.min = 5000;
      break;
    case 'palace':
      priceInputElement.min = 10000;
      break;
  }
};

var changeArrivalandDepartureHandler = function (evt) {
  if (evt.target === arrivalInputElement) {
    departureInputElement.value = evt.target.value;
  } else {
    arrivalInputElement.value = evt.target.value;
  }
};

var submitFormHandler = function () {
  for (var i = 0; i < inputElements.length; i++) {
    resetInvalidHighlightingInput(inputElements[i]);
  }
  checkDisabledOptions();
};

var resetFormHandler = function () {
  offerFormElement.reset();
  unsetActiveState();
};

unsetActiveState();

mainPinElement.addEventListener('mouseup', setActiveStateHandler);
mainPinElement.addEventListener('mouseup', addMapPinsHandler);
mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);

submitBtnElement.addEventListener('click', submitFormHandler);
resetBtnElement.addEventListener('click', resetFormHandler);
departureInputElement.addEventListener('change', changeArrivalandDepartureHandler);
arrivalInputElement.addEventListener('change', changeArrivalandDepartureHandler);
typeInputElement.addEventListener('change', checkPricePerNight);
roomsInputElement.addEventListener('change', roomsInputHandler);

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener('invalid', function (evt) {
    highlightInvalidInput(evt.target);
  });
}
