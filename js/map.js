'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var type = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 1;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;

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


var makeMixArray = function (arr) {
  var mixArr = [];
  var numArr = arr.length;
  for (var i = 0; i < numArr; i++) {
    mixArr.push(getRandomItems(arr, true)[0]);
  }
  return mixArr;
};

var atsMix = makeMixArray(avatars);
var generatorAtr = function (arr, i) {
  var atrImg = 'img/avatars/user' + atsMix[i] + '.png';
  return atrImg;
};

var ttsMix = makeMixArray(titles);

var generatorPrice = function () {
  var value = getRandomNumber(MIN_PRICE, MAX_PRICE);
  return value;
};

var generatorType = function () {
  var houseType = type[getRandomNumber(0, type.length)];
  return houseType;
};

var generatorRooms = function () {
  var rooms = getRandomNumber(MIN_ROOM, MAX_ROOM);
  return rooms;
};

var generatorGuests = function () {
  var guests = getRandomNumber(MIN_GUESTS, MAX_GUESTS);
  return guests;
};

var generatorCheckInOut = function () {
  var checkInOutIndex = getRandomNumber(0, times.length);
  var checkInOut = times[checkInOutIndex];
  return checkInOut;
};

var generatorFeatures = function () {
  var fts = [];
  var num = getRandomNumber(0, features.length);
  for (var i = 0; i <= num; i++) {
    fts.push(features[i]);
  }
  return fts;
};

var phtsMix = makeMixArray(photos);
var generatorPhotos = function () {
  var phts = phtsMix;
  return phts;
};

var dataHotel = function () {
  var dataHtl = [];
  for (var i = 0; i < 8; i++) {
    var x = getRandomNumber(MIN_X, MAX_X);
    var y = getRandomNumber(MIN_Y, MAX_Y);
    var checkInOut = generatorCheckInOut();
    dataHtl.push({
      'author': {
        avatar: generatorAtr(avatars, i)
      },
      'offer': {
        title: ttsMix[i],
        address: x + ', ' + y,
        price: generatorPrice(),
        type: generatorType(),
        rooms: generatorRooms(),
        guests: generatorGuests(),
        checkin: checkInOut,
        checkout: checkInOut,
        features: generatorFeatures(),
        description: '',
        photos: generatorPhotos()
      },
      'location': {
        x: x,
        y: y
      }
    });
  }
  return dataHtl;
};
var dataHotelArr = dataHotel();

var pin = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');
var pins = document.createDocumentFragment();

var getMapPins = function () {
  for (var i = 0; i < 8; i++) {
    var pinEl = pin.content.cloneNode(true);
    var pinBtn = pinEl.querySelector('.map__pin');
    var pinImg = pinEl.querySelector('img');

    pinBtn.style.cssText = 'left: ' + dataHotelArr[i].location.x + 'px;' + ' top: ' + dataHotelArr[i].location.y + 'px;';
    pinImg.src = dataHotelArr[i].author.avatar;
    pinImg.alt = dataHotelArr[i].offer.title;

    pins.appendChild(pinEl);
  }
  mapPins.appendChild(pins);
};
getMapPins();

var map = document.querySelector('.map');
var mapFilterContainer = map.querySelector('.map__filters-container');
var card = document.querySelector('#card');

var cardEl = card.content.cloneNode(true);
var cardElTitle = cardEl.querySelector('.popup__title');
var cardElAddress = cardEl.querySelector('.popup__text--address');
var cardElPrice = cardEl.querySelector('.popup__text--price');
var cardElType = cardEl.querySelector('.popup__type');
var cardElCapacity = cardEl.querySelector('.popup__text--capacity');
var cardElTime = cardEl.querySelector('.popup__text--time');
var cardElFeatures = cardEl.querySelector('.popup__features');
var cardElDescription = cardEl.querySelector('.popup__description');
var cardElPhotos = cardEl.querySelector('.popup__photos');
var cardElAvatar = cardEl.querySelector('.popup__avatar');


var renderCard = function (data) {
  cardElTitle.textContent = data.offer.title;
  cardElAddress.textContent = data.offer.address;
  cardElPrice.textContent = data.offer.price + '₽/ночь';

  var offerType;
  switch (data.offer.type) {
    case 'palace':
      offerType = 'Дворец';
      break;
    case 'house':
      offerType = 'Дом';
      break;
    case 'bungalo':
      offerType = 'Бунгало';
      break;
    case 'flat':
      offerType = 'Квартира';
      break;
  }
  cardElType.textContent = offerType;
  cardElCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  while (cardElFeatures.children.length) {
    cardElFeatures.children[0].remove();
  }
  var getFeaturesElementLi = function () {
    var list = data.offer.features;
    for (var i = 0; i < list.length; i++) {
      var li = document.createElement('li');
      var classLi = 'popup__feature--' + list[i];
      li.classList.add('popup__feature', classLi);
      cardElFeatures.appendChild(li);
    }
  };
  getFeaturesElementLi();

  cardElDescription.textContent = data.offer.description;

  while (cardElPhotos.children.length) {
    cardElPhotos.children[0].remove();
  }
  var getPhotos = function () {
    var phots = data.offer.photos;
    for (var i = 0; i < phots.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      img.src = phots[i];
      cardElPhotos.appendChild(img);
    }
  };
  getPhotos();

  cardElAvatar.src = data.author.avatar;
  map.insertBefore(cardEl, mapFilterContainer);
};
renderCard(dataHotelArr[0]);

