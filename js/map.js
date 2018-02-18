'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_PEAK_HEIGHT = 22;
  var MAIN_PIN_HEIGHT = 65;
  var mainPinElement = document.querySelector('.map__pin--main');

  var setAddress = function (xCoordinate, yCoordinate) {
    var adressInputElement = document.querySelector('#address');
    adressInputElement.value = Math.round(xCoordinate) + ', ' + Math.round(yCoordinate);
  };

  var mainPinMouseupHandler = function (evt) {
    var mainPinOffsetLeft = evt.currentTarget.offsetLeft;
    var mainPinOffsetTop = evt.currentTarget.offsetTop;
    var mainPinXCoordinate = mainPinOffsetLeft + MAIN_PIN_WIDTH / 2;
    var mainPinYCoordinate = mainPinOffsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_PEAK_HEIGHT;

    setAddress(mainPinXCoordinate, mainPinYCoordinate);
  };

  var addMapPinsHandler = function () {
    if (document.querySelectorAll('.map__pin').length < 2) {
      window.mapPins.render(window.data);
    }
  };

  window.appState.unsetActive();

  mainPinElement.addEventListener('mouseup', window.appState.setActive);
  mainPinElement.addEventListener('mouseup', addMapPinsHandler);
  mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);
})();
