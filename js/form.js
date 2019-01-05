'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var numRooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var typeHousing = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressNoticeForm = noticeForm.querySelector('#address');

  var textCoords = function (x, y) {
    var pinMainX = Math.floor(x + window.data.PIN_MAIN_WIDTH / 2);
    var pinMainY = Math.floor(y + window.data.PIN_MAIN_HEIGHT);

    addressNoticeForm.setAttribute('disabled', '');

    addressNoticeForm.value = pinMainX + ', ' + pinMainY;
  };

  textCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);

  var toggleDisabled = function (flag) {
    var fieldset = noticeForm.querySelectorAll('.ad-form fieldset');
    if (flag) {
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].setAttribute('disabled', '');
      }
      noticeForm.classList.add('ad-form--disabled');
    } else {
      for (var j = 0; j < fieldset.length; j++) {
        fieldset[j].removeAttribute('disabled');
      }
      noticeForm.classList.remove('ad-form--disabled');
    }

  };

  var setPlaceholderAndMinPrice = function (minValue) {
    price.placeholder = minValue;
    price.min = minValue;
  };

  var timingTypeAndPriceHousing = function (evt) {
    setPlaceholderAndMinPrice(window.data.PriceOfType[evt.target.value.toUpperCase()]);
  };

  typeHousing.addEventListener('input', timingTypeAndPriceHousing);

  var disabledNumRooms = function () {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].setAttribute('disabled', '');
    }
  };

  var includeNumRooms = function (index) {
    capacity.options[index].removeAttribute('disabled');
  };

  var timingNumRoomsAndGuests = function () {
    capacity.value = numRooms.value;
    if (numRooms.value === '100') {
      capacity.value = '0';
    }
    disabledNumRooms();
    for (var j = 0; j < capacity.options.length; j++) {
      if (capacity.value === '3' && j < 3) {
        includeNumRooms(j);
      } else if (capacity.value === '2' && j > 0 && j < 3) {
        includeNumRooms(j);
      } else if (capacity.value === '1' && j === 2) {
        includeNumRooms(j);
      } else if (capacity.value === '0' && j === 3) {
        includeNumRooms(j);
      }
    }
  };

  timingNumRoomsAndGuests();
  numRooms.addEventListener('input', timingNumRoomsAndGuests);

  var setTimeinAndTimeout = function (time) {
    timein.value = time;
    timeout.value = time;
  };
  var timingTimeinAndTimeout = function (evt) {
    setTimeinAndTimeout(evt.target.value);
  };
  timein.addEventListener('input', timingTimeinAndTimeout);
  timeout.addEventListener('input', timingTimeinAndTimeout);

  var existSuccessAndErrorForm = function () {
    var success = document.querySelector('.success');
    var error = document.querySelector('.error');
    if (success) {
      success.remove();
      addressNoticeForm.setAttribute('disabled', '');
      return;
    } else if (error) {
      error.remove();
      return;
    }
  };

  var hideSuccessAndErrorForm = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE || evt.type === 'mousedown') {
      existSuccessAndErrorForm();
      document.removeEventListener('keydown', hideSuccessAndErrorForm);
      document.removeEventListener('mousedown', hideSuccessAndErrorForm);
    }
  };
  var onSuccess = function () {
    var success = document.querySelector('#success');
    var successForm = success.content.cloneNode(true);
    var main = document.querySelector('main');

    existSuccessAndErrorForm();

    main.appendChild(successForm);

    document.addEventListener('keydown', hideSuccessAndErrorForm);
    document.addEventListener('mousedown', hideSuccessAndErrorForm);
  };

  var onError = function () {
    var error = document.querySelector('#error');
    var errorForm = error.content.cloneNode(true);
    var main = document.querySelector('main');

    existSuccessAndErrorForm();

    main.appendChild(errorForm);

    var errorButton = document.querySelector('.error__button');

    document.addEventListener('keydown', hideSuccessAndErrorForm);
    document.addEventListener('mousedown', hideSuccessAndErrorForm);

    errorButton.addEventListener('mousedown', function () {
      window.uploadData(new FormData(noticeForm), onSuccess, onError);
    });
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addressNoticeForm.removeAttribute('disabled');
    window.uploadData(new FormData(noticeForm), onSuccess, onError);
  });


  var resetForm = noticeForm.querySelector('.ad-form__reset');

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    if (pins.length) {
      for (var i = 1; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };
  var removePopup = function () {
    var popup = document.querySelector('.map__card');
    if (popup !== null) {
      popup.remove();
    }
  };

  var deactivePage = function () {
    noticeForm.reset();
    capacity.options[capacity.options.selectedIndex].removeAttribute('selected');
    capacity.options[window.data.CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
    toggleDisabled(true);
    removePopup();
    removePins();
    map.classList.add('map--faded');
    window.map.setPositionPinMain(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    textCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    pinMain.addEventListener('mouseup', window.map.activePage);
  };

  resetForm.addEventListener('click', deactivePage);

  window.form = {
    textCoords: textCoords,
    toggleDisabled: toggleDisabled
  };
})();

