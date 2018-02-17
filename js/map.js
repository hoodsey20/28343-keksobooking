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

unsetActiveState();

mainPinElement.addEventListener('mouseup', setActiveStateHandler);
mainPinElement.addEventListener('mouseup', addMapPinsHandler);
mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);
