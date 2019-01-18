'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var DEBOUNCE_INTERVAL = 5000; // ms
  var Filters = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var PriceRange = {
    'middle': {
      'from': 10000,
      'to': 49999
    },
    'low': {
      'from': 0,
      'to': 9999
    },
    'high': {
      'from': 50000,
      'to': Infinity
    }
  };

  var Features = {
    'wifi': false,
    'dishwasher': false,
    'parking': false,
    'washer': false,
    'elevator': false,
    'conditioner': false
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  var setFilters = function (evt) {
    if (evt.target.name === 'features') {
      Features[evt.target.value] = evt.target.checked;
    } else {
      Filters[evt.target.name] = evt.target.value;
    }
    debounce(applyFilters)();
  };

  var applyFilters = function () {
    var filterOfType = function (item) {
      return (
        Filters['housing-type'] === 'any' ||
        item.offer.type === Filters['housing-type']
      );
    };
    var filterOfPrice = function (item) {
      return (
        Filters['housing-price'] === 'any' ||
        item.offer.price >= PriceRange[Filters['housing-price']].from &&
        item.offer.price <= PriceRange[Filters['housing-price']].to
      );
    };
    var filterOfRooms = function (item) {
      return (
        Filters['housing-rooms'] === 'any' ||
        item.offer.rooms === parseInt(Filters['housing-rooms'], 10)
      );
    };
    var filterOfGuests = function (item) {
      return (
        Filters['housing-guests'] === 'any' ||
        item.offer.guests === parseInt(Filters['housing-guests'], 10)
      );
    };
    var filterOfFeatures = function (item) {
      var result = true;
      for (var key in Features) {
        if (Features[key] && item.offer.features.indexOf(key) === -1) {
          result = false;
          break;
        }
      }
      return result;
    };

    var filter = function () {
      return window.data.hotelPins.filter(function (item) {
        return (
          filterOfType(item) &&
          filterOfPrice(item) &&
          filterOfRooms(item) &&
          filterOfGuests(item) &&
          filterOfFeatures(item)
        );
      });
    };
    window.data.filtratedHotelPins = filter();
    window.map.removePins();
    window.map.renderPinsOnMap(window.data.filtratedHotelPins);
  };

  filtersForm.addEventListener('change', setFilters);
})();

