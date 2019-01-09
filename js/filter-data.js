'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var typeHousing = filtersForm.querySelector('#housing-type');
  var TYPE_OF_HOUSE = null;
  var filterTypeHousing = function (evt) {
    if (evt.target.value === TYPE_OF_HOUSE) {
      return;
    }
    TYPE_OF_HOUSE = evt.target.value;

    window.map.removePins();

    var filtrated = function () {
      return window.data.hotelPins.filter(function (item) {
        return (
          TYPE_OF_HOUSE === 'any' ||
          item.offer.type === TYPE_OF_HOUSE
        );
      });
    };

    window.data.filtratedHotelPins = filtrated();

    window.map.renderPinsOnMap(window.data.filtratedHotelPins);
  };
  typeHousing.addEventListener('input', filterTypeHousing);

  filtersForm.addEventListener('change', function () {

  });
})();

