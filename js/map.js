'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var pinMain = document.querySelector('.map__pin--main');

  window.form.toggleDisabled(true);

  var toggleDisabledFiltrate = function (flag) {
    var mapFilters = mapFilterContainer.querySelector('.map__filters');
    if (flag) {
      for (var i = 0; i < mapFilters.children.length; i++) {
        mapFilters.children[i].setAttribute('disabled', '');
      }
    } else {
      for (var j = 0; j < mapFilters.children.length; j++) {
        mapFilters.children[j].removeAttribute('disabled');
      }
    }
  };

  toggleDisabledFiltrate(true);

  var renderPinsOnMap = function (data) {
    var pinsOnMap = window.pin(data);
    mapPins.appendChild(pinsOnMap);
  };

  var renderCardOnMap = function (data) {
    var card = window.card(data);
    map.insertBefore(card, mapFilterContainer);
  };

  var onCardShowClick = function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var clickedElement = parseInt(evt.target.closest('.map__pin').getAttribute('data-index'), 10);
      removeCard();
      evt.target.closest('.map__pin').classList.add('map__pin--active');
      renderCardOnMap(window.data.filtratedHotelPins[clickedElement]);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', onCardHideClick);
      document.addEventListener('keydown', onCardHideKeyDown);
      return;
    }
  };

  var onCardHideClick = function (evt) {
    var card = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    var pinActive = mapPins.querySelector('.map__pin--active');
    if (evt.target.closest('.popup__close')) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
      popupClose.removeEventListener('click', onCardHideClick);
    }
  };

  var onCardHideKeyDown = function (evt) {
    var card = document.querySelector('.map__card');
    var pinActive = mapPins.querySelector('.map__pin--active');
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardHideClick);
    }
  };

  var removePins = function () {
    var pinsOnMap = document.querySelector('.map__pins');
    var containerPins = pinsOnMap.querySelectorAll('.map__pin');
    Array.from(containerPins).forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        pinsOnMap.removeChild(item);
      }
    });
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    var pinActive = mapPins.querySelector('.map__pin--active');
    if (card) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
    }
  };

  var onError = function (msg) {
    throw new Error(msg);
  };

  var onPinMainClick = function () {
    window.loadData(renderPinsOnMap, onError);
    map.classList.remove('map--faded');
    window.form.toggleDisabled(false);
    handlerPins();
    pinMain.removeEventListener('mouseup', onPinMainClick);
  };

  var handlerPins = function () {
    var pinsContainer = map.querySelector('.map__pins');
    pinsContainer.addEventListener('click', onCardShowClick);
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


    var onPinMainMouseMove = function (moveEvt) {
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
    };

    document.addEventListener('mousemove', onPinMainMouseMove);

    var onPinMainMouseUp = function () {
      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mouseup', onPinMainMouseUp);
  });

  pinMain.addEventListener('mouseup', onPinMainClick);

  window.map = {
    setPositionPinMain: setPositionPinMain,
    onPinMainClick: onPinMainClick,
    renderPinsOnMap: renderPinsOnMap,
    onError: onError,
    removePins: removePins,
    removeCard: removeCard,
    toggleDisabledFiltrate: toggleDisabledFiltrate
  };
})();
