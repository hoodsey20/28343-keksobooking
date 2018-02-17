'use strict';

(function () {
  var offerFormElement = document.querySelector('.notice__form');
  var inputElements = offerFormElement.querySelectorAll('input');
  var arrivalInputElement = offerFormElement.querySelector('#timein');
  var departureInputElement = offerFormElement.querySelector('#timeout');
  var submitBtnElement = offerFormElement.querySelector('.form__submit');
  var resetBtnElement = offerFormElement.querySelector('.form__reset');
  var roomsInputElement = offerFormElement.querySelector('#room_number');
  var typeInputElement = offerFormElement.querySelector('#type');

  var checkDisabledOptions = function () {
    var selectElements = offerFormElement.querySelectorAll('select');

    for (var i = 0; i < selectElements.length; i++) {
      var selectedOptionElement = window.formUtil.findOptionByValue(selectElements[i], selectElements[i].value);
      window.formUtil.resetInvalidHighlightingInput(selectElements[i]);
      selectElements[i].setCustomValidity('');

      if (selectedOptionElement.disabled) {
        window.formUtil.highlightInvalidInput(selectElements[i]);
        selectElements[i].setCustomValidity('Данный вариант не может быть принят');
      }
    }
  };

  var submitFormHandler = function () {
    for (var i = 0; i < inputElements.length; i++) {
      window.formUtil.resetInvalidHighlightingInput(inputElements[i]);
    }
    checkDisabledOptions();
  };

  var changeArrivalandDepartureHandler = function (evt) {
    if (evt.target === arrivalInputElement) {
      departureInputElement.value = evt.target.value;
    } else {
      arrivalInputElement.value = evt.target.value;
    }
  };

  var typeInputHandler = function (evt) {
    var priceInputElement = offerFormElement.querySelector('#price');

    switch (evt.target.value) {
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

  var roomsInputHandler = function (evt) {
    var capacityInputElement = offerFormElement.querySelector('#capacity');
    var capacityOptionElements = capacityInputElement.querySelectorAll('option');

    switch (evt.target.value) {
      case '1':
        window.formUtil.setDisabledByValue(capacityOptionElements, ['0', '2', '3']);
        break;
      case '2':
        window.formUtil.setDisabledByValue(capacityOptionElements, ['0', '3']);
        break;
      case '3':
        window.formUtil.setDisabledByValue(capacityOptionElements, ['0']);
        break;
      case '100':
        window.formUtil.setDisabledByValue(capacityOptionElements, ['1', '2', '3']);
        break;
    }
  };

  var resetFormHandler = function () {
    offerFormElement.reset();
    window.unsetActiveState();
  };

  submitBtnElement.addEventListener('click', submitFormHandler);
  resetBtnElement.addEventListener('click', resetFormHandler);
  departureInputElement.addEventListener('change', changeArrivalandDepartureHandler);
  arrivalInputElement.addEventListener('change', changeArrivalandDepartureHandler);
  typeInputElement.addEventListener('change', typeInputHandler);
  roomsInputElement.addEventListener('change', roomsInputHandler);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('invalid', function (evt) {
      window.formUtil.highlightInvalidInput(evt.target);
    });
  }
})();
