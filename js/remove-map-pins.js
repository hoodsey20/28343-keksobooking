'use strict';

(function () {
  window.removeMapPins = function () {
    var pinsElements = document.querySelectorAll('.map__pin');

    if (pinsElements.length < 2) {
      return;
    }

    pinsElements = Array.prototype.slice.call(pinsElements, 1);

    for (var i = 0; i < pinsElements.length; i++) {
      pinsElements[i].remove();
    }
  };
})();
