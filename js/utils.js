'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var toggleDisabled = function (item, flag) {
    if (flag) {
      for (var i = 0; i < item.children.length; i++) {
        item.children[i].setAttribute('disabled', '');
      }
      return;
    } for (var j = 0; j < item.children.length; j++) {
      item.children[j].removeAttribute('disabled');
    }
  };

  window.utils = {
    debounce: debounce,
    toggleDisabled: toggleDisabled
  };

})();
