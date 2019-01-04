'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.data.dataHotelArr = xhr.response;
        onSuccess();
      } else {
        try {
          throw new Error(xhr.status);
        } catch (error) {
          console.error('Cтатус ответа: ' + error);
        }
      }
    });

    xhr.send();


  };
})();
