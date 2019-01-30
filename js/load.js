'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 30000;

  var onPinMainLoad = function (evt) {
    var xhr = evt.currentTarget;
    if (xhr.status !== STATUS_SUCCESS) {
      window.map.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      return;
    }
    window.data.hotelPins = xhr.response;
    window.data.filtratedHotelPins = xhr.response;
    window.utils.toggleDisabled(window.data.mapFilters, false);
    window.map.renderPinsOnMap(window.data.hotelPins);
    return;
  };

  var onButtonFormLoad = function (evt) {
    var xhr = evt.currentTarget;
    if (xhr.status !== STATUS_SUCCESS) {
      window.form.onError();
      window.map.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      return;
    }
    window.form.onSuccess();
  };
  var addErrorMessage = function (method) {
    if (method === 'POST') {
      window.form.onError();
    }
  };
  var serverRequest = function (method, URL, cb, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', cb);
    xhr.addEventListener('error', function () {
      addErrorMessage(method);
      window.map.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      addErrorMessage(method);
      window.map.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, URL);
    if (method === 'POST') {
      xhr.send(data);
      return;
    }
    xhr.send();
  };

  function loadData() {
    serverRequest('GET', URL_LOAD, onPinMainLoad);
  }
  function uploadData(data) {
    serverRequest('POST', URL_UPLOAD, onButtonFormLoad, data);
  }
  window.load = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
