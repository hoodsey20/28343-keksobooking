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

var checkDisabledOptions = function () {
  var selectElements = offerFormElement.querySelectorAll('select');

  for (var i = 0; i < selectElements.length; i++) {
    var selectedOptionElement = window.util.findOptionByValue(selectElements[i], selectElements[i].value);
    window.formUtil.resetInvalidHighlightingInput(selectElements[i]);
    selectElements[i].setCustomValidity('');

    if (selectedOptionElement.disabled) {
      window.formUtil.highlightInvalidInput(selectElements[i]);
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
    window.formUtil.resetInvalidHighlightingInput(inputElements[i]);
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
    window.formUtil.highlightInvalidInput(evt.target);
  });
}
