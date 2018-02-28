'use strict';

(function () {
  var PRICE_LOWER_LIMIT = 10000;
  var PRICE_UPPER_LIMIT = 50000;
  var DEBOUNCE_TIME = 500;

  var filters = {
    'features': [],
  };
  var filterFormElements = document.querySelector('.map__filters').elements;

  var getFilteredOffers = function () {
    var currentOffers = window.offers.slice(0);

    var filteredOffers = currentOffers.filter(function (item) {
      if (filters['housing-type']
        && item.offer.type !== filters['housing-type']) {
        return false;
      }

      if (filters['housing-price'] === 'low' &&
        Number(item.offer.price) >= PRICE_LOWER_LIMIT) {
        return false;
      }

      if (filters['housing-price'] === 'middle' &&
        (Number(item.offer.price) < PRICE_LOWER_LIMIT || Number(item.offer.price) >= PRICE_UPPER_LIMIT)) {
        return false;
      }

      if (filters['housing-price'] === 'high' &&
        Number(item.offer.price) < PRICE_UPPER_LIMIT) {
        return false;
      }

      if (filters['housing-rooms']
        && Number(item.offer.rooms) !== Number(filters['housing-rooms'])) {
        return false;
      }

      if (filters['housing-guests'] &&
        Number(item.offer.guests) !== Number(filters['housing-guests'])) {
        return false;
      }

      if (filters.features.length &&
        window.util.getArraysDifference(item.offer.features, filters.features).length > 0) {
        return false;
      }

      return true;
    });

    return filteredOffers;
  };

  var applyOfferFilters = function () {
    window.offerCard.remove();
    window.mapPins.remove();
    window.mapPins.render(getFilteredOffers());
  };

  var checkboxChangeHandler = function (evt) {
    if (evt.target.checked) {
      filters.features.push(evt.target.value);
    } else {
      filters.features = filters.features.filter(function (item) {
        return item !== evt.target.value;
      });
    }
  };

  var selectChangeHandler = function (evt) {
    if (evt.target.value === 'any') {
      delete filters[evt.target.name];
    } else {
      filters[evt.target.name] = evt.target.value;
    }
  };

  for (var i = 0; i < filterFormElements.length; i++) {
    if (filterFormElements[i].type === 'checkbox') {
      filterFormElements[i].addEventListener('change', checkboxChangeHandler);
      filterFormElements[i].addEventListener('change', window.debounce(applyOfferFilters, DEBOUNCE_TIME));
    } else if (filterFormElements[i].tagName === 'SELECT') {
      filterFormElements[i].addEventListener('change', selectChangeHandler);
      filterFormElements[i].addEventListener('change', window.debounce(applyOfferFilters, DEBOUNCE_TIME));
    }
  }
})();
