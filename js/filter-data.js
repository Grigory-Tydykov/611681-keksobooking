'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var typeHousing = filtersForm.querySelector('#housing-type');

  var filterTypeHousing = function (evt) {

    if (evt.target.value === window.data.TYPE_OF_HOUSE) {
      return;
    }

    window.data.TYPE_OF_HOUSE = evt.target.value;

    window.map.removePins();

    window.data.filtretedHotelPins = window.data.hotelPins.filter(function (item) {
      return item.offer.type === window.data.TYPE_OF_HOUSE;
    });

    if (window.data.filtretedHotelPins.length) {
      return window.map.renderPinsOnMap(window.data.filtretedHotelPins);
    } else if (window.data.TYPE_OF_HOUSE === 'any') {
      window.data.filtretedHotelPins = window.data.hotelPins;
      return window.map.renderPinsOnMap(window.data.filtretedHotelPins);
    }

  };
  typeHousing.addEventListener('input', filterTypeHousing);

  // filtersForm.addEventListener('change', function () {

  // });
})();

