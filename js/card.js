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
    cardElTitle.textContent = data.offer.title;
    cardElAddress.textContent = data.offer.address;
    cardElPrice.textContent = data.offer.price + '₽/ночь';

    cardElType.textContent = window.data.TYPES[data.offer.type.toUpperCase()];
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

    return cardEl;
  };
  window.card = createCard;
})();


