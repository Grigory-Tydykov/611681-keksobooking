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
    capacity.value = numRooms.value === '100' ? '0' : numRooms.value;
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


  var removeSuccessForm = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
      addressNoticeForm.setAttribute('disabled', '');
      return;
    }
  };

  var removeErrorForm = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
      return;
    }
  };

  var onFormHideMousedown = function (evt) {
    if (evt.type === 'mousedown') {
      removeSuccessForm();
      removeErrorForm();
      document.removeEventListener('mousedown', onFormHideMousedown);
    }
  };

  var onFormHideKeydown = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      removeSuccessForm();
      removeErrorForm();
      document.removeEventListener('keydown', onFormHideKeydown);
    }
  };

  var onSuccess = function () {
    var success = document.querySelector('#success');
    var successForm = success.content.cloneNode(true);
    var main = document.querySelector('main');

    removeSuccessForm();

    main.appendChild(successForm);

    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('mousedown', onFormHideMousedown);
  };

  var onError = function () {
    var error = document.querySelector('#error');
    var errorForm = error.content.cloneNode(true);
    var main = document.querySelector('main');

    removeErrorForm();

    main.appendChild(errorForm);

    var errorButton = document.querySelector('.error__button');

    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('mousedown', onFormHideMousedown);

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

  var onFormResetClick = function () {
    noticeForm.reset();
    capacity.options[capacity.options.selectedIndex].removeAttribute('selected');
    capacity.options[window.data.CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
    toggleDisabled(true);
    window.map.removeCard();
    window.map.removePins();
    map.classList.add('map--faded');
    window.map.setPositionPinMain(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    textCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    pinMain.addEventListener('mouseup', window.map.onPinMainClick);
  };

  resetForm.addEventListener('click', onFormResetClick);

  window.form = {
    textCoords: textCoords,
    toggleDisabled: toggleDisabled
  };
})();

