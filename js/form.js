'use strict';

(function () {
  var numRooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var typeHousing = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var address = document.querySelector('#address');
  var resetForm = document.querySelector('.ad-form__reset');
  var success;
  var error;
  var main;


  var setTextCoords = function (x, y) {
    var pinMainX = Math.floor(x + window.data.PIN_MAIN_WIDTH / 2);
    var pinMainY = Math.floor(y + window.data.PIN_MAIN_HEIGHT);

    address.setAttribute('disabled', '');

    address.value = pinMainX + ', ' + pinMainY;
  };

  setTextCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);

  var setPlaceholderAndMinPrice = function (minValue) {
    price.placeholder = minValue;
    price.min = minValue;
  };

  var onTypeHousingInput = function (evt) {
    setPlaceholderAndMinPrice(window.data.PRICE_OF_TYPE[evt.target.value.toUpperCase()]);
  };

  typeHousing.addEventListener('input', onTypeHousingInput);

  var disabledNumRooms = function () {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].setAttribute('disabled', '');
    }
  };

  var includeNumRooms = function (index) {
    capacity.options[index].removeAttribute('disabled');
  };

  var onNumRoomsInput = function () {
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

  onNumRoomsInput();
  numRooms.addEventListener('input', onNumRoomsInput);

  var setTimeinAndTimeout = function (time) {
    timein.value = time;
    timeout.value = time;
  };
  var onTimeinTimeoutFieldsInput = function (evt) {
    setTimeinAndTimeout(evt.target.value);
  };
  timein.addEventListener('input', onTimeinTimeoutFieldsInput);
  timeout.addEventListener('input', onTimeinTimeoutFieldsInput);


  var removeSuccessForm = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
      address.setAttribute('disabled', '');
      return;
    }
  };

  var removeErrorForm = function () {
    var errorMessage = document.querySelector('.error');
    if (errorMessage) {
      errorMessage.remove();
      return;
    }
  };

  var onFormHideClick = function () {
    removeSuccessForm();
    removeErrorForm();
    document.removeEventListener('keydown', onFormHideKeydown);
    document.removeEventListener('click', onFormHideClick);
  };

  var onFormHideKeydown = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      removeSuccessForm();
      removeErrorForm();
      document.removeEventListener('keydown', onFormHideKeydown);
      document.addEventListener('click', onFormHideClick);
    }
  };

  var onSuccess = function () {
    success = success ? success : document.querySelector('#success');
    var successForm = success.content.cloneNode(true);
    main = main ? main : document.querySelector('main');
    removeSuccessForm();
    onFormResetClick();
    main.appendChild(successForm);
    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('click', onFormHideClick);
  };

  var onError = function () {
    error = error ? error : document.querySelector('#error');
    var errorForm = error.content.cloneNode(true);
    main = main ? main : document.querySelector('main');
    removeErrorForm();
    main.appendChild(errorForm);
    var errorButton = document.querySelector('.error__button');
    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('click', onFormHideClick);
    errorButton.addEventListener('mousedown', function () {
      window.load.uploadData(new FormData(window.data.noticeForm));
    });
  };

  window.data.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    address.removeAttribute('disabled');
    window.load.uploadData(new FormData(window.data.noticeForm));
  });

  var onFormResetClick = function () {
    window.data.noticeForm.reset();
    capacity.options[capacity.options.selectedIndex].removeAttribute('selected');
    capacity.options[window.data.CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
    window.data.previewAvatar.src = window.data.avatarFormSrc;
    window.utils.toggleDisabled(window.data.noticeForm, true);
    window.map.removeCard();
    window.map.removePins();
    window.data.map.classList.add('map--faded');
    window.data.noticeForm.classList.toggle('ad-form--disabled');
    setPlaceholderAndMinPrice(window.data.PRICE_OF_TYPE_DEFAULT);
    window.map.setPositionPinMain(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    setTextCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    window.data.pinMain.addEventListener('mouseup', window.map.onPinMainMouseup);
  };

  resetForm.addEventListener('click', onFormResetClick);

  window.form = {
    setTextCoords: setTextCoords,
    onSuccess: onSuccess,
    onError: onError
  };
})();
