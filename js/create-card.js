'use strict';

(function () {
  var card = document.querySelector('#card');

  window.createCard = function (data) {
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

    var getFieldsCard = function (field, value, textPrice) {
      if (value) {
        textPrice = textPrice || '';
        field.textContent = value + textPrice;
        return true;
      }
      field.textContent = '';
      return true;
    };

    var getTypeFieldCard = function (field, type) {
      field.textContent = type ? window.data.Types[type.toUpperCase()] : '';
    };

    var getCapacityFieldCard = function (field, rooms, guests, textRooms, textGuests) {
      field.textContent = rooms && guests ? rooms + textRooms + guests + textGuests : '';
    };

    var getTimeFieldCard = function (field, arrival, departure, textArival, textDeparture) {
      field.textContent = arrival && departure ? textArival + arrival + textDeparture + departure : '';
    };

    var getFeaturesFieldCard = function (field, features) {
      for (var i = 0; i < features.length; i++) {
        var featuresClass = '.popup__feature--' + features[i];
        var element = field.querySelector(featuresClass);
        element.style.display = 'inline-block';
      }
    };

    var getPhotosFieldCard = function (field, photos) {
      for (var k = 0; k < photos.length; k++) {
        var img = document.createElement('img');
        img.classList.add('popup__photo');
        img.width = '45';
        img.height = '40';
        img.alt = 'Фотография жилья';
        img.src = photos[k];
        field.appendChild(img);
      }
    };

    var getAvatarFieldCard = function (field, avatar) {
      if (avatar) {
        field.src = avatar;
        return true;
      }
      field.style.display = 'none';
      return true;
    };

    getFieldsCard(cardElTitle, data.offer.title);
    getFieldsCard(cardElAddress, data.offer.address);
    getFieldsCard(cardElPrice, data.offer.price, '₽/ночь');
    getFieldsCard(cardElAddress, data.offer.address);
    getTypeFieldCard(cardElType, data.offer.type);
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
})();
