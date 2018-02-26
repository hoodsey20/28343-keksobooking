'use strict';

(function () {
  var filterSelectElements = document.querySelectorAll('.map__filter');
  var filterFeaturesElements = document.querySelectorAll('.features input');

  for (var i = 0; i < filterSelectElements.length; i++) {
    filterSelectElements[i].addEventListener('change', function (evt) {
      window.filters[evt.target.name] = evt.target.value;
    });
  }

  for (var j = 0; j < filterFeaturesElements.length; j++) {
    filterFeaturesElements[j].addEventListener('change', function (evt) {
      window.filters.features[evt.target.value] = evt.target.checked;
    });
  }

  window.filters = {
    'features': {},
  };

})();
