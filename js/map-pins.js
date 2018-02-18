'use strict';

window.mapPins = (function () {
  var MAP_PIN_HEIGHT = 70;

  var createOfferPin = function (offer) {
    var templateElement = document.querySelector('template');
    var mapPinTemplate = templateElement.content.querySelector('.map__pin');
    var pin = mapPinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = offer.location.x + 'px';
    pin.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
    pinImg.src = offer.author.avatar;

    pin.addEventListener('click', function () {
      window.offerCard.remove();
      window.offerCard.render(offer);
    });

    return pin;
  };

  return {
    remove: function () {
      var pinsElements = document.querySelectorAll('.map__pin');

      if (pinsElements.length < 2) {
        return;
      }

      pinsElements = Array.prototype.slice.call(pinsElements, 1);

      for (var i = 0; i < pinsElements.length; i++) {
        pinsElements[i].remove();
      }
    },
    render: function (offers) {
      var mapPinsContainerELement = document.querySelector('.map__pins');
      var mapPinsFragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        mapPinsFragment.appendChild(createOfferPin(offers[i]));
      }

      mapPinsContainerELement.appendChild(mapPinsFragment);
    },
  };
})();
