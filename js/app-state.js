'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var offerFormElement = document.querySelector('.notice__form');
  var offerFormFieldsetElements = offerFormElement.querySelectorAll('fieldset');

  window.appState = {};

  window.appState.setActive = function () {
    offerFormElement.classList.remove('notice__form--disabled');
    mapElement.classList.remove('map--faded');
    for (var i = 0; i < offerFormFieldsetElements.length; i++) {
      offerFormFieldsetElements[i].disabled = false;
    }
  };

  window.appState.unsetActive = function () {
    offerFormElement.classList.add('notice__form--disabled');
    mapElement.classList.add('map--faded');
    for (var i = 0; i < offerFormFieldsetElements.length; i++) {
      offerFormFieldsetElements[i].disabled = true;
    }
    window.formUtil.resetAllInvalidHighlighting();
    window.mapPins.remove();
    window.offerCard.remove();
  };
})();
