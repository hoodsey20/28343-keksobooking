'use strict';

(function () {
  window.removeOfferCard = function () {
    var offerCardElement = document.querySelector('.map__card');
    if (offerCardElement) {
      offerCardElement.remove();
    }
  };
})();
