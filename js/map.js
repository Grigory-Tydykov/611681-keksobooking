'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFeatures = document.querySelector('.map__features');

  window.utils.toggleDisabled(window.data.noticeForm, true);
  window.form.toggleClass(true);
  window.utils.toggleDisabled(window.data.mapFilters, true);

  mapFeatures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE && !evt.target.checked) {
      evt.target.checked = true;
    } else if (evt.keyCode === window.data.ENTER_KEYCODE && evt.target.checked) {
      evt.target.checked = false;
    }
  });


  var renderPinsOnMap = function (data) {
    var pinsOnMap = window.pin(data);
    mapPins.appendChild(pinsOnMap);
  };

  var renderCardOnMap = function (data) {
    var card = window.card(data);
    window.data.map.insertBefore(card, mapFilterContainer);
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
    var containerPins = document.querySelectorAll('.map__pin');
    Array.from(containerPins).forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        mapPins.removeChild(item);
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
    window.data.map.classList.remove('map--faded');
    window.utils.toggleDisabled(window.data.noticeForm, false);
    window.form.toggleClass(false);
    handlerPins();
    window.data.pinMain.removeEventListener('mouseup', onPinMainClick);
  };

  var handlerPins = function () {
    mapPins.addEventListener('click', onCardShowClick);
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  var setPositionPinMain = function (pinMainX, pinMainY) {
    window.data.pinMain.style.left = pinMainX + 'px';
    window.data.pinMain.style.top = pinMainY + 'px';
  };

  window.data.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coordsMap = getCoords(window.data.map);
    var coordsPinMain = getCoords(window.data.pinMain);

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

  window.data.pinMain.addEventListener('mouseup', onPinMainClick);

  window.map = {
    setPositionPinMain: setPositionPinMain,
    onPinMainClick: onPinMainClick,
    renderPinsOnMap: renderPinsOnMap,
    onError: onError,
    removePins: removePins,
    removeCard: removeCard,
  };
})();
