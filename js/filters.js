'use strict';

(function () {
  var filterFormElements = document.querySelector('.map__filters').elements;

  var checkboxChangeHandler = function (evt) {
    if (evt.target.checked) {
      window.filters.features.push(evt.target.value);
    } else {
      window.filters.features = window.filters.features.filter(function (item) {
        return item !== evt.target.value;
      });
    }
  };

  var selectChangeHandler = function (evt) {
    window.filters[evt.target.name] = evt.target.value;
  };

  for (var i = 0; i < filterFormElements.length; i++) {
    if (filterFormElements[i].type === 'checkbox') {
      filterFormElements[i].addEventListener('change', checkboxChangeHandler);
    } else if (filterFormElements[i].tagName === 'SELECT') {
      filterFormElements[i].addEventListener('change', selectChangeHandler);
    }
  }

  window.filters = {
    'features': [],
  };

})();
