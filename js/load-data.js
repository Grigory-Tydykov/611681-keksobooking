'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        return onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      window.data.dataHotelArr = xhr.response;
      onSuccess(window.data.dataHotelArr);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.send();
  };
})();
