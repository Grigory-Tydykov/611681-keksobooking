'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var pinMain = document.querySelector('.map__pin--main');

  window.form.toggleDisabled(true);

  var renderPinsOnMap = function () {

    var pinsOnMap = window.pin();
    mapPins.appendChild(pinsOnMap);
  };

  var renderCardOnMap = function (data) {
    var card = window.card(data);
    map.insertBefore(card, mapFilterContainer);
  };

  var showAds = function (evt) {
    if (evt.target.closest('.map__pin')) {
      var clickedElement = parseInt(evt.target.closest('.map__pin').getAttribute('data-index'), 10);
      if (isNaN(clickedElement)) {
        return;
      }
      isShowAds();
      renderCardOnMap(window.data.dataHotelArr[clickedElement]);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', hideAds);
      document.addEventListener('keydown', hideAds);
      return;
    }
  };

  var isShowAds = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var hideAds = function (evt) {
    var card = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    if (evt.target.closest('.popup__close') || evt.keyCode === window.data.ESC_KEYCODE) {
      card.remove();
      popupClose.removeEventListener('click', hideAds);
      document.removeEventListener('keydown', hideAds);
    }
  };

  var activePage = function () {
    map.classList.remove('map--faded');
    window.form.toggleDisabled(false);
    renderPinsOnMap();
    handlerPins();
    pinMain.removeEventListener('mouseup', activePage);
  };

  var handlerPins = function () {
    var pinsContainer = map.querySelector('.map__pins');
    pinsContainer.addEventListener('click', showAds);
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  var setPositionPinMain = function (pinMainX, pinMainY) {
    pinMain.style.left = pinMainX + 'px';
    pinMain.style.top = pinMainY + 'px';
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coordsMap = getCoords(map);
    var coordsPinMain = getCoords(pinMain);

    var shiftX = evt.pageX - coordsPinMain.left + coordsMap.left;
    var shiftY = evt.pageY - coordsPinMain.top;


    function moveAt(moveEvt) {
      var pinMainX = moveEvt.pageX - shiftX;
      var pinMainY = moveEvt.pageY - shiftY;

      var checkArea = function (position, axis) {

        var min = window.data['MIN_' + axis];
        var max = window.data['MAX_' + axis];

        position = position < min ? min : position;
        position = position > max ? max : position;

        return position;
      };

      var pinMainPositionX = checkArea(pinMainX, 'X');
      var pinMainPositionY = checkArea(pinMainY, 'Y');

      setPositionPinMain(pinMainPositionX, pinMainPositionY);

      window.form.textCoords(pinMainPositionX, pinMainPositionY);
    }

    document.addEventListener('mousemove', moveAt);

    function upAt() {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', upAt);
    }

    document.addEventListener('mouseup', upAt);
  });

  pinMain.addEventListener('mouseup', activePage);

  window.map = {
    setPositionPinMain: setPositionPinMain,
    activePage: activePage
  };
})();
