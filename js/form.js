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
  var avatarFileSelect = document.querySelector('.ad-form-header__input');
  var dropZone = document.querySelector('.ad-form-header__drop-zone');

  var addAvatarForm = function (file) {
    var reader = new FileReader();

    reader.onloadend = function () {
      window.data.preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      window.data.preview.src = '';
    }
  };

  var onFileSelectChange = function () {
    var file = document.querySelector('.ad-form-header__input').files[0];
    addAvatarForm(file);
  };
  avatarFileSelect.addEventListener('change', onFileSelectChange);

  var onFileSelectDrop = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    addAvatarForm(file);
  };

  var onСaptureFileDragover = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  dropZone.addEventListener('dragover', onСaptureFileDragover);
  dropZone.addEventListener('drop', onFileSelectDrop);

  var textCoords = function (x, y) {
    var pinMainX = Math.floor(x + window.data.PIN_MAIN_WIDTH / 2);
    var pinMainY = Math.floor(y + window.data.PIN_MAIN_HEIGHT);

    address.setAttribute('disabled', '');

    address.value = pinMainX + ', ' + pinMainY;
  };

  textCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);

  var toggleClass = function (flag) {
    if (flag) {
      window.data.noticeForm.classList.add('ad-form--disabled');
      return;
    }
    window.data.noticeForm.classList.remove('ad-form--disabled');
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
      address.setAttribute('disabled', '');
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
    onFormResetClick();
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
      window.uploadData(new FormData(window.data.noticeForm), onSuccess, onError);
    });
  };

  window.data.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    address.removeAttribute('disabled');
    window.uploadData(new FormData(window.data.noticeForm), onSuccess, onError);
  });

  var onFormResetClick = function () {
    window.data.noticeForm.reset();
    capacity.options[capacity.options.selectedIndex].removeAttribute('selected');
    capacity.options[window.data.CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
    window.data.preview.src = window.data.avatarFormSrc;
    window.utils.toggleDisabled(window.data.noticeForm, true);
    window.map.removeCard();
    window.map.removePins();
    window.data.map.classList.add('map--faded');
    window.map.setPositionPinMain(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    textCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    window.data.pinMain.addEventListener('mouseup', window.map.onPinMainClick);
  };

  resetForm.addEventListener('click', onFormResetClick);

  window.form = {
    textCoords: textCoords,
    toggleClass: toggleClass
  };
})();
