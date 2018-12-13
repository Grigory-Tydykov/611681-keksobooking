'use strict';

var Titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var Avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var Type = ['palace', 'house', 'bungalo', 'flat'];
var Times = ['12:00', '13:00', '14:00'];
var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var Photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 1;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 62;
var PIN_MAIN_X = 570;
var PIN_MAIN_Y = 375;
var Types = {
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало',
  flat: 'Кваритра'
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
  var num = getRandomNumber(0, Features.length);
  for (var i = 0; i <= num; i++) {
    fts.push(Features[i]);
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
    var checkInOut = Times[getRandomNumber(0, Times.length)];
    dataHtl.push({
      'author': {
        avatar: 'img/avatars/user' + getRandomItems(Avatars, true) + '.png'
      },
      'offer': {
        title: getRandomItems(Titles, true),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: Type[getRandomNumber(0, Type.length)],
        rooms: getRandomNumber(MIN_ROOM, MAX_ROOM),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: checkInOut,
        checkout: checkInOut,
        features: getFeatures(),
        description: '',
        photos: Photos.sort(compareRandom)
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

var getMapPins = function () {
  var pin = document.querySelector('#pin');
  var mapPins = document.querySelector('.map__pins');
  var pins = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var pinEl = pin.content.cloneNode(true);
    var pinBtn = pinEl.querySelector('.map__pin');
    var pinImg = pinEl.querySelector('img');

    var pinPositionX = dataHotelArr[i].location.x - PIN_WIDTH / 2;
    var pinPositionY = dataHotelArr[i].location.y - PIN_HEIGHT;
    pinBtn.setAttribute('data-index', i);
    pinBtn.style.left = pinPositionX + 'px';
    pinBtn.style.top = pinPositionY + 'px';
    pinImg.src = dataHotelArr[i].author.avatar;
    pinImg.alt = dataHotelArr[i].offer.title;

    pins.appendChild(pinEl);
  }
  mapPins.appendChild(pins);
};

var map = document.querySelector('.map');
var mapFilterContainer = map.querySelector('.map__filters-container');


var renderCard = function (data) {
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
  cardElTitle.textContent = data.offer.title;
  cardElAddress.textContent = data.offer.address;
  cardElPrice.textContent = data.offer.price + '₽/ночь';

  cardElType.textContent = Types[data.offer.type];
  cardElCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  for (var i = 0; i < cardElFeatures.children.length; i++) {
    cardElFeatures.children[i].style.display = 'none';
  }
  var getFeaturesElementLi = function () {
    var list = data.offer.features;
    for (var j = 0; j < list.length; j++) {
      var li = document.createElement('li');
      var classLi = 'popup__feature--' + list[j];
      li.classList.add('popup__feature', classLi);
      cardElFeatures.appendChild(li);
    }
  };
  getFeaturesElementLi();

  cardElDescription.textContent = data.offer.description;

  for (var j = 0; j < cardElPhotos.children.length; j++) {
    cardElPhotos.children[j].style.display = 'none';
  }
  var getPhotos = function () {
    var homePhotos = data.offer.photos;
    for (var k = 0; k < homePhotos.length; k++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      img.src = homePhotos[k];
      cardElPhotos.appendChild(img);
    }
  };
  getPhotos();

  cardElAvatar.src = data.author.avatar;

  var cardElTabIndex = cardEl.querySelector('.popup__close');
  cardElTabIndex.setAttribute('tabindex', '0');
  map.insertBefore(cardEl, mapFilterContainer);
};

var noticeForm = document.querySelector('.ad-form');

var fieldset = noticeForm.querySelectorAll('.ad-form fieldset');
for (var i = 0; i < fieldset.length; i++) {
  fieldset[i].setAttribute('disabled', '');
}
var adressNoticeForm = noticeForm.querySelector('#address');
adressNoticeForm.value = (PIN_MAIN_X + PIN_MAIN_WIDTH / 2) + ', ' + (PIN_MAIN_Y + PIN_MAIN_HEIGHT / 2);

var pinMain = document.querySelector('.map__pin--main');

var activePage = function () {
  map.classList.remove('map--faded');
  getMapPins();
  noticeForm.classList.remove('ad-form--disabled');
  for (var j = 0; j < fieldset.length; j++) {
    fieldset[j].removeAttribute('disabled');
  }
};


var showAds = function (evt) {
  var card = document.querySelector('.map__card');
  var clickedElement = parseInt(evt.target.parentNode.getAttribute('data-index'), 10);
  if (evt.keyCode) {
    clickedElement = parseInt(evt.target.getAttribute('data-index'), 10);
  }
  var pinsBtn = map.querySelectorAll('.map__pin');

  for (var j = 0; j < pinsBtn.length; j++) {
    if (j === clickedElement) {
      if (card) {
        card.remove();
      }
      renderCard(dataHotelArr[j]);

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', hideAds);
      document.addEventListener('keydown', hideAdsEscPress);

    }
  }
};

var showAdsEnterPress = function (evt) {
  if (evt.keyCode === 13) {
    showAds(evt);
  }
};

var hideAds = function () {
  var card = document.querySelector('.map__card');
  card.remove();
};

var hideAdsEscPress = function (evt) {
  var card = document.querySelector('.map__card');
  if (evt.keyCode === 27 && card) {
    hideAds();
  }
};

pinMain.addEventListener('mouseup', function () {
  activePage();
  var pinsBtn = map.querySelector('.map__pins');
  pinsBtn.addEventListener('click', showAds);
  pinsBtn.addEventListener('keydown', showAdsEnterPress);
});

