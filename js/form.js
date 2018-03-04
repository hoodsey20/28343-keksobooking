'use strict';

(function () {
  var MIN_PRICES = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000,
  };

  var offerFormElement = document.querySelector('.notice__form');
  var inputElements = offerFormElement.querySelectorAll('input');
  var arrivalInputElement = offerFormElement.querySelector('#timein');
  var departureInputElement = offerFormElement.querySelector('#timeout');
  var submitBtnElement = offerFormElement.querySelector('.form__submit');
  var resetBtnElement = offerFormElement.querySelector('.form__reset');
  var roomsInputElement = offerFormElement.querySelector('#room_number');
  var typeInputElement = offerFormElement.querySelector('#type');
  var capacityInputElement = offerFormElement.querySelector('#capacity');
  var capacityOptionElements = capacityInputElement.querySelectorAll('option');

  var checkDisabledOptions = function () {
    var selectElements = offerFormElement.querySelectorAll('select');
    var isValid = true;

    for (var i = 0; i < selectElements.length; i++) {
      var selectedOptionElement = selectElements[i].selectedOptions[0];
      window.formUtil.resetInvalidHighlightingInput(selectElements[i]);
      selectElements[i].setCustomValidity('');

      if (selectedOptionElement.disabled) {
        isValid = false;
        window.formUtil.highlightInvalidInput(selectElements[i]);
        selectElements[i].setCustomValidity('Данный вариант не может быть принят');
      }
    }

    return isValid;
  };

  var formSubmitHandler = function (evt) {
    for (var i = 0; i < inputElements.length; i++) {
      window.formUtil.resetInvalidHighlightingInput(inputElements[i]);
    }
    var isInputsValid = offerFormElement.checkValidity();
    var isOptionsValid = checkDisabledOptions();

    if (isInputsValid && isOptionsValid) {
      evt.preventDefault();
      var formData = new FormData(offerFormElement);
      window.errorHandler.delete();
      window.backend.send(formData, formResetHandler, window.errorHandler.show);
    }
  };

  var checkSelectsChangeHandler = function (evt) {
    if (evt.target === arrivalInputElement) {
      departureInputElement.value = evt.target.value;
    } else {
      arrivalInputElement.value = evt.target.value;
    }
  };

  var typeInputChangeHandler = function (evt) {
    var priceInputElement = offerFormElement.querySelector('#price');

    switch (evt.target.value) {
      case 'flat':
        priceInputElement.min = MIN_PRICES['flat'];
        break;
      case 'bungalo':
        priceInputElement.min = MIN_PRICES['bungalo'];
        break;
      case 'house':
        priceInputElement.min = MIN_PRICES['house'];
        break;
      case 'palace':
        priceInputElement.min = MIN_PRICES['palace'];
        break;
    }
  };

  var roomsInputChangeHandler = function (evt) {
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

  var formResetHandler = function () {
    offerFormElement.reset();
    window.appState.unsetActive();
  };

  submitBtnElement.addEventListener('click', formSubmitHandler);
  resetBtnElement.addEventListener('click', formResetHandler);
  departureInputElement.addEventListener('change', checkSelectsChangeHandler);
  arrivalInputElement.addEventListener('change', checkSelectsChangeHandler);
  typeInputElement.addEventListener('change', typeInputChangeHandler);
  roomsInputElement.addEventListener('change', roomsInputChangeHandler);

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('invalid', function (evt) {
      window.formUtil.highlightInvalidInput(evt.target);
    });
  }
})();
