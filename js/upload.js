'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        try {
          throw new Error(xhr.status);
        } catch (error) {
          console.error('Cтатус ответа: ' + error);
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
