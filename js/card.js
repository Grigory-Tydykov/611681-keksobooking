'use strict';

(function () {
  var createCard = function (data) {
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

    var getFieldsCard = function (field, value, txt) {
      if (value) {
        txt = txt || '';
        field.textContent = value + txt;
        return;
      }
      field.textContent = '';
    };

    var getCapacityFieldCard = function (field, value1, value2, txt1, txt2) {
      if (value1 && value2) {
        field.textContent = value1 + txt1 + value2 + txt2;
        return;
      }
      field.textContent = '';
    };

    var getTimeFieldCard = function (field, value1, value2, txt1, txt2) {
      if (value1 && value2) {
        field.textContent = txt1 + value1 + txt2 + value2;
        return;
      }
      field.textContent = '';
    };

    var getFeaturesFieldCard = function (field, value) {
      for (var i = 0; i < value.length; i++) {
        var featuresClass = '.popup__feature--' + value[i];
        var element = field.querySelector(featuresClass);
        element.style.display = 'inline-block';
      }
    };

    var getPhotosFieldCard = function (field, value) {
      for (var k = 0; k < value.length; k++) {
        var img = document.createElement('img');
        img.classList.add('popup__photo');
        img.width = '45';
        img.height = '40';
        img.alt = 'Фотография жилья';
        img.src = value[k];
        field.appendChild(img);
      }
    };

    var getAvatarFieldCard = function (field, value) {
      if (value) {
        field.src = value;
        return;
      }
      field.src = '';
    };

    getFieldsCard(cardElTitle, data.offer.title);
    getFieldsCard(cardElAddress, data.offer.address);
    getFieldsCard(cardElPrice, data.offer.price, '₽/ночь');
    getFieldsCard(cardElAddress, data.offer.address);
    getFieldsCard(cardElType, window.data.TYPES[data.offer.type.toUpperCase()]);
    getCapacityFieldCard(cardElCapacity, data.offer.rooms, data.offer.guests, ' команты для ', ' гостей');
    getTimeFieldCard(cardElTime, data.offer.checkin, data.offer.checkout, 'Заезд после ', ', выезд до ');
    getFeaturesFieldCard(cardElFeatures, data.offer.features);
    getFieldsCard(cardElDescription, data.offer.description);
    getPhotosFieldCard(cardElPhotos, data.offer.photos);
    getAvatarFieldCard(cardElAvatar, data.author.avatar);

    var cardElTabIndex = cardEl.querySelector('.popup__close');
    cardElTabIndex.setAttribute('tabindex', '0');

    return cardEl;
  };
  window.card = createCard;
})();
