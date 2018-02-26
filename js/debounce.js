'use strict';

(function () {
  window.debounce = function (fun, interval) {
    var timer = null;

    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(fun, interval);
    };
  };
})();
