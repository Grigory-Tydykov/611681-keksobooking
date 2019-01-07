'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var typeHousing = mapFiltersContainer.querySelector('#housing-type');

  var filterTypeHousing = function (evt) {
    var pinsOnMap = document.querySelector('.map__pins');
    var containerPins = pinsOnMap.querySelectorAll('.map__pin');

    Array.from(containerPins).slice(1).forEach(function (item) {
      pinsOnMap.removeChild(item);
    });

    var dataFilterArr = window.data.dataHotelArr.filter(function (item) {
      return item.offer.type === evt.target.value;
    });

    if (evt.target.value === window.data.ANY_TYPE_HOUSING) {
      window.map.renderPinsOnMap(window.data.dataHotelArr);
    } else if (dataFilterArr.length) {
      window.map.renderPinsOnMap(dataFilterArr);
    }
  };
  typeHousing.addEventListener('input', filterTypeHousing);
})();

