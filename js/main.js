'use strict';

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

  cardElType.textContent = TYPES[data.offer.type.toUpperCase()];
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

var textCoords = function (x, y) {
  var pinMainX = Math.floor(x + PIN_MAIN_WIDTH / 2);
  var pinMainY = Math.floor(y + PIN_MAIN_Y);
  var addressNoticeForm = noticeForm.querySelector('#address');
  addressNoticeForm.setAttribute('disabled', '');

  addressNoticeForm.value = pinMainX + ', ' + pinMainY;
};

var pinMain = document.querySelector('.map__pin--main');

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

toggleDisabled(true);

var activePage = function () {
  map.classList.remove('map--faded');
  toggleDisabled(false);
  getMapPins();
  renderPins();
  pinMain.removeEventListener('mouseup', activePage);
};

var showAds = function (evt) {
  if (evt.target.closest('.map__pin')) {
    var clickedElement = parseInt(evt.target.closest('.map__pin').getAttribute('data-index'), 10);
    if (isNaN(clickedElement)) {
      return;
    }
    isShowAds();
    renderCard(dataHotelArr[clickedElement]);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', hideAds);
    document.addEventListener('keydown', hideAds);
    return;
  }
};

var isShowAds = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
};

var hideAds = function (evt) {
  var card = document.querySelector('.map__card');
  var popupClose = document.querySelector('.popup__close');
  if (evt.target.closest('.popup__close') || evt.keyCode === ESC_KEYCODE) {
    card.remove();
    popupClose.removeEventListener('click', hideAds);
    document.removeEventListener('keydown', hideAds);
  }
};

textCoords(PIN_MAIN_X, PIN_MAIN_Y);

var renderPins = function () {
  var pinsContainer = map.querySelector('.map__pins');
  pinsContainer.addEventListener('click', showAds);
};

var numRooms = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');
var typeHousing = noticeForm.querySelector('#type');
var price = noticeForm.querySelector('#price');
var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');

var setPlaceholderAndMinPrice = function (minValue) {
  price.placeholder = minValue;
  price.min = minValue;
};

var timingTypeAndPriceHousing = function (evt) {
  setPlaceholderAndMinPrice(PriceOfType[evt.target.value.toUpperCase()]);
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

var existSuccessForm = function () {
  var success = document.querySelector('.success');
  if (success) {
    success.remove();
  }
};

var hideSuccessForm = function (evt) {
  var success = document.querySelector('.success');

  if (evt.keyCode === ESC_KEYCODE || evt.type === 'mousedown') {
    success.remove();
    document.removeEventListener('keydown', hideSuccessForm);
    document.removeEventListener('mousedown', hideSuccessForm);
  }
};


noticeForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var success = document.querySelector('#success');
  var successForm = success.content.cloneNode(true);
  var main = document.querySelector('main');

  existSuccessForm();

  main.appendChild(successForm);

  document.addEventListener('keydown', hideSuccessForm);
  document.addEventListener('mousedown', hideSuccessForm);
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
var setPositionPinMain = function (pinMainX, pinMainY) {
  pinMain.style.left = pinMainX + 'px';
  pinMain.style.top = pinMainY + 'px';
};
var deactivePage = function () {
  noticeForm.reset();
  capacity.options[capacity.options.selectedIndex].removeAttribute('selected');
  capacity.options[CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
  toggleDisabled(true);
  removePopup();
  removePins();
  map.classList.add('map--faded');
  setPositionPinMain(PIN_MAIN_X, PIN_MAIN_Y);
  textCoords(PIN_MAIN_X, PIN_MAIN_Y);
  pinMain.addEventListener('mouseup', activePage);
};

resetForm.addEventListener('click', deactivePage);

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};


pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var coords = getCoords(pinMain);
  var shiftX = evt.pageX - coords.left;
  var shiftY = evt.pageY - coords.top;

  function moveAt(moveEvt) {

    var pinMainX = moveEvt.pageX - shiftX;
    var pinMainY = moveEvt.pageY - shiftY;

    textCoords(pinMainX, pinMainY);

    if (pinMainY < MIN_Y) {
      pinMainY = MIN_Y;
    } if (pinMainY > MAX_Y) {
      pinMainY = MAX_Y;
    } if (pinMainX < MIN_X) {
      pinMainX = MIN_X;
    } if (pinMainX > MAX_X) {
      pinMainX = MAX_X;
    }
    setPositionPinMain(pinMainX, pinMainY);
  }

  document.addEventListener('mousemove', moveAt);

  function upAt() {
    document.removeEventListener('mousemove', moveAt);
    pinMain.removeEventListener('mouseup', upAt);
  }

  pinMain.addEventListener('mouseup', upAt);
});

pinMain.addEventListener('mouseup', activePage);

