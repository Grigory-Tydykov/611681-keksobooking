'use strict';

(function () {
  var createPins = function () {
    var pin = document.querySelector('#pin');
    var pins = document.createDocumentFragment();
    for (var i = 0; i < 10; i++) {
      var pinEl = pin.content.cloneNode(true);
      var pinBtn = pinEl.querySelector('.map__pin');
      var pinImg = pinEl.querySelector('img');


      var pinPositionX = window.data.dataHotelArr[i].location.x - window.data.PIN_WIDTH / 2;
      var pinPositionY = window.data.dataHotelArr[i].location.y - window.data.PIN_HEIGHT;
      pinBtn.setAttribute('data-index', i);
      pinBtn.style.left = pinPositionX + 'px';
      pinBtn.style.top = pinPositionY + 'px';
      pinImg.src = window.data.dataHotelArr[i].author.avatar;
      pinImg.alt = window.data.dataHotelArr[i].offer.title;

      pins.appendChild(pinEl);
    }
    return pins;
  };
  window.pin = createPins;
})();

