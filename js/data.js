'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOM = 1;
  var MAX_ROOM = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var TYPE = ['palace', 'house', 'bungalo', 'flat'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
  var CAPACITY_DEFAULT_INDEX = 2;
  var PriceOfType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomItems = function (arr, unique) {
    var randomIndex = getRandomNumber(0, arr.length);
    if (unique) {
      return arr.splice(randomIndex, 1);
    }
    return arr[randomIndex];
  };


  var getFeatures = function () {
    var fts = [];
    var num = getRandomNumber(0, FEATURES.length);
    for (var i = 0; i <= num; i++) {
      fts.push(FEATURES[i]);
    }
    return fts;
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var dataHotel = function () {
    var dataHtl = [];
    for (var i = 0; i < 8; i++) {
      var locationX = getRandomNumber(MIN_X, MAX_X);
      var locationY = getRandomNumber(MIN_Y, MAX_Y);
      var checkInOut = TIMES[getRandomNumber(0, TIMES.length)];
      dataHtl.push({
        'author': {
          avatar: 'img/avatars/user' + getRandomItems(AVATARS, true) + '.png'
        },
        'offer': {
          title: getRandomItems(TITLES, true),
          address: locationX + ', ' + locationY,
          price: getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: TYPE[getRandomNumber(0, TYPE.length)],
          rooms: getRandomNumber(MIN_ROOM, MAX_ROOM),
          guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: checkInOut,
          checkout: checkInOut,
          features: getFeatures(),
          description: '',
          photos: PHOTOS.sort(compareRandom)
        },
        'location': {
          x: locationX,
          y: locationY
        }
      });
    }
    return dataHtl;
  };
  var dataHotelArr = dataHotel();

  window.data = {
    dataHotelArr: dataHotelArr,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_X: PIN_MAIN_X,
    PIN_MAIN_Y: PIN_MAIN_Y,
    TYPES: TYPES,
    ESC_KEYCODE: ESC_KEYCODE,
    CAPACITY_DEFAULT_INDEX: CAPACITY_DEFAULT_INDEX,
    PriceOfType: PriceOfType
  };
})();
