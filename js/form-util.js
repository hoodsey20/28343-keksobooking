'use strict';

(function () {
  window.formUtil = {};

  window.formUtil.highlightInvalidInput = function (input) {
    input.classList.add('invalid-value-input');
  };

  window.formUtil.resetInvalidHighlightingInput = function (input) {
    input.classList.remove('invalid-value-input');
  };

  window.formUtil.resetAllInvalidHighlighting = function () {
    var invalidInputs = document.querySelectorAll('.invalid-value-input');
    for (var i = 0; i < invalidInputs.length; i++) {
      this.resetInvalidHighlightingInput(invalidInputs[i]);
    }
  };

  window.formUtil.setDisabledByValue = function (elements, values) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
      if (values.indexOf(elements[i].value) > -1) {
        elements[i].disabled = true;
      }
    }
  };
})();
