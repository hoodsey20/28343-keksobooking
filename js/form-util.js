'use strict';

window.formUtil = (function () {
  return {
    highlightInvalidInput: function (input) {
      input.classList.add('invalid-value-input');
    },
    resetInvalidHighlightingInput: function (input) {
      input.classList.remove('invalid-value-input');
    },
    resetAllInvalidHighlighting: function () {
      var invalidInputs = document.querySelectorAll('.invalid-value-input');
      for (var i = 0; i < invalidInputs.length; i++) {
        this.resetInvalidHighlightingInput(invalidInputs[i]);
      }
    },
  };
})();
