'use strict';

(function () {
  var MAP_PIN_HEIGHT = 70;
  var PIN_ELEMENTS_QUANTITY = 5;

  var createOfferPin = function (offer) {
    var templateElement = document.querySelector('template');
    var mapPinTemplate = templateElement.content.querySelector('.map__pin');
    var pinElemet = mapPinTemplate.cloneNode(true);
    var pinImg = pinElemet.querySelector('img');

    pinElemet.style.left = offer.location.x + 'px';
    pinElemet.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
    pinImg.src = offer.author.avatar;

    pinElemet.addEventListener('click', function () {
      window.offerCard.remove();
      window.offerCard.render(offer);
    });

    return pinElemet;
  };

  window.mapPins = {};

  window.mapPins.remove = function () {
    var pinsElements = document.querySelectorAll('.map__pin');

    if (pinsElements.length < 2) {
      return;
    }

    pinsElements = Array.prototype.slice.call(pinsElements, 1);

    for (var i = 0; i < pinsElements.length; i++) {
      pinsElements[i].remove();
    }
  };

  window.mapPins.render = function (offers) {
    var mapPinsContainerELement = document.querySelector('.map__pins');
    var mapPinsFragment = document.createDocumentFragment();

    for (var i = 0; i < Math.min(offers.length, PIN_ELEMENTS_QUANTITY); i++) {
      mapPinsFragment.appendChild(createOfferPin(offers[i]));
    }

    mapPinsContainerELement.appendChild(mapPinsFragment);
  };
})();
