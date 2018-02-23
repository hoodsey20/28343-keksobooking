'use strict';

(function () {
  var errorPanelElement = document.querySelector('.error-panel');
  var errorTextElement = errorPanelElement.querySelector('.error-panel__text');
  var errorCloseElement = errorPanelElement.querySelector('.error-panel__close-btn');

  errorCloseElement.addEventListener('click', function () {
    errorPanelElement.classList.remove('error-panel_active');
  });

  window.errorHandler = function (errorText) {
    errorPanelElement.classList.add('error-panel_active');
    errorTextElement.textContent = errorText;
  };

})();
