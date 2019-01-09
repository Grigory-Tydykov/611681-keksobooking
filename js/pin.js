'use strict';

(function () {
  var createPins = function (data) {
    var pin = document.querySelector('#pin');
    var pins = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      if (i >= 5) {
        break;
      }
      var pinEl = pin.content.cloneNode(true);
      var pinBtn = pinEl.querySelector('.map__pin');
      var pinImg = pinEl.querySelector('img');

      var pinPositionX = data[i].location.x - window.data.PIN_WIDTH / 2;
      var pinPositionY = data[i].location.y - window.data.PIN_HEIGHT;

      pinBtn.setAttribute('data-index', i);

      pinBtn.style.left = pinPositionX + 'px';
      pinBtn.style.top = pinPositionY + 'px';

      pinImg.src = data[i].author.avatar;
      pinImg.alt = data[i].offer.title;

      pins.appendChild(pinEl);
    }
    return pins;
  };
  window.pin = createPins;
})();

