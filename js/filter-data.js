'use strict';

(function () {
  var filters = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var PRICE_RANGE = {
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

  var features = {
    'wifi': false,
    'dishwasher': false,
    'parking': false,
    'washer': false,
    'elevator': false,
    'conditioner': false
  };

  var setFilters = function (evt) {
    if (evt.target.name === 'features') {
      features[evt.target.value] = evt.target.checked;
      return;
    } else {
      filters[evt.target.name] = evt.target.value;
    }
  };

  var applyFilters = function () {
    var filterOfType = function (item) {
      return (
        filters['housing-type'] === 'any' ||
        item.offer.type === filters['housing-type']
      );
    };
    var filterOfPrice = function (item) {
      return (
        filters['housing-price'] === 'any' ||
        item.offer.price >= PRICE_RANGE[filters['housing-price']].from &&
        item.offer.price <= PRICE_RANGE[filters['housing-price']].to
      );
    };
    var filterOfRooms = function (item) {
      return (
        filters['housing-rooms'] === 'any' ||
        item.offer.rooms === parseInt(filters['housing-rooms'], 10)
      );
    };
    var filterOfGuests = function (item) {
      return (
        filters['housing-guests'] === 'any' ||
        item.offer.guests === parseInt(filters['housing-guests'], 10)
      );
    };
    var filterOfFeatures = function (item) {
      var result = true;
      for (var key in features) {
        if (features[key] && item.offer.features.indexOf(key) === -1) {
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

  var chatterFn = window.utils.debounce(applyFilters);

  window.data.mapFilters.addEventListener('change', function (evt) {
    window.map.removeCard();
    setFilters(evt);
    chatterFn();
  });
})();
