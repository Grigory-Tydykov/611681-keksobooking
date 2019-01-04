'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        window.map.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      } else {
        onSuccess();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
