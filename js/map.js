'use strict';

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
  window.formUtil.resetAllInvalidHighlighting();
  window.removeMapPins();
  window.removeOfferCard();
  mainPinElement.addEventListener('mouseup', addMapPinsHandler);
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
  window.renderMapPins(generatedOffers);
  mainPinElement.removeEventListener('mouseup', addMapPinsHandler);
};

var submitBtnElement = offerFormElement.querySelector('.form__submit');
var resetBtnElement = offerFormElement.querySelector('.form__reset');
var inputElements = offerFormElement.querySelectorAll('input');
var roomsInputElement = offerFormElement.querySelector('#room_number');
var typeInputElement = offerFormElement.querySelector('#type');
var arrivalInputElement = offerFormElement.querySelector('#timein');
var departureInputElement = offerFormElement.querySelector('#timeout');

var resetFormHandler = function () {
  offerFormElement.reset();
  unsetActiveState();
};

unsetActiveState();

mainPinElement.addEventListener('mouseup', setActiveStateHandler);
mainPinElement.addEventListener('mouseup', addMapPinsHandler);
mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);

submitBtnElement.addEventListener('click', window.formHandlers.submitFormHandler);
resetBtnElement.addEventListener('click', resetFormHandler);
departureInputElement.addEventListener('change', window.formHandlers.changeArrivalandDepartureHandler);
arrivalInputElement.addEventListener('change', window.formHandlers.changeArrivalandDepartureHandler);
typeInputElement.addEventListener('change', window.formHandlers.typeInputHandler);
roomsInputElement.addEventListener('change', window.formHandlers.roomsInputHandler);

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener('invalid', function (evt) {
    window.formUtil.highlightInvalidInput(evt.target);
  });
}
