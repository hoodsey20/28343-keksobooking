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
      if (filters['housing-type']) {
        return item.offer.type === filters['housing-type'];
      } else {
        return true;
      }
    }).filter(function (item) {
      if (filters['housing-price'] === 'low') {
        return Number(item.offer.price) < PRICE_LOWER_LIMIT;
      } else if (filters['housing-price'] === 'middle') {
        return Number(item.offer.price) >= PRICE_LOWER_LIMIT && Number(item.offer.price) <= PRICE_UPPER_LIMIT;
      } else if (filters['housing-price'] === 'high') {
        return Number(item.offer.price) > PRICE_UPPER_LIMIT;
      } else {
        return true;
      }
    }).filter(function (item) {
      if (filters['housing-rooms']) {
        return Number(item.offer.rooms) === Number(filters['housing-rooms']);
      } else {
        return true;
      }
    }).filter(function (item) {
      if (filters['housing-guests']) {
        return Number(item.offer.guests) === Number(filters['housing-guests']);
      } else {
        return true;
      }
    }).filter(function (item) {
      if (filters.features.length) {
        return window.util.getArraysDifference(item.offer.features, filters.features).length === 0;
      } else {
        return true;
      }
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
