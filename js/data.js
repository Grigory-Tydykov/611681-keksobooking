'use strict';

(function () {
  var MIN_X = 0;
  var MAX_X = 1134;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 84;
  var PIN_MAIN_X = 570;
  var PIN_MAIN_Y = 375;
  var TYPES = {
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
    FLAT: 'Кваритра'
  };
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var CAPACITY_DEFAULT_INDEX = 2;
  var PriceOfType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var noticeForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var preview = document.querySelector('.ad-form-header__preview img');

  var avatarFormSrc = preview.src;


  window.data = {
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_X: PIN_MAIN_X,
    PIN_MAIN_Y: PIN_MAIN_Y,
    TYPES: TYPES,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CAPACITY_DEFAULT_INDEX: CAPACITY_DEFAULT_INDEX,
    PriceOfType: PriceOfType,
    noticeForm: noticeForm,
    map: map,
    pinMain: pinMain,
    mapFilters: mapFilters,
    preview: preview,
    avatarFormSrc: avatarFormSrc
  };
})();
