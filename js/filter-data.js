'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var typeHousing = filtersForm.querySelector('#housing-type');
  var TYPE_OF_HOUSE = null;
  var filterTypeHousing = function (evt) {

    if (evt.target.value === TYPE_OF_HOUSE) {
      return;
    }

    window.data.TYPE_OF_HOUSE = evt.target.value;

    window.map.removePins();

    var filtrated = function () {
      var value = window.data.hotelPins.filter(function (item) {
        return item.offer.type === window.data.TYPE_OF_HOUSE;
      });
      if (value.length === 0 && window.data.TYPE_OF_HOUSE === 'any') {
        value = window.data.hotelPins;
      }
      return value;
    };

    window.data.filtratedHotelPins = filtrated();

    window.map.renderPinsOnMap(window.data.filtratedHotelPins);
  };
  typeHousing.addEventListener('input', filterTypeHousing);

  filtersForm.addEventListener('change', function () {

  });
})();

