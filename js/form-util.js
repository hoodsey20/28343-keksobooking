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
    findOptionByValue: function (selectElement, value) {
      var optionElements = selectElement.querySelectorAll('option');
      var currentOptionElement = null;

      for (var i = 0; i < optionElements.length; i++) {
        if (optionElements[i].value === value) {
          currentOptionElement = optionElements[i];
        }
      }

      return currentOptionElement;
    },
    setDisabledByValue: function (elements, values) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
        if (values.indexOf(elements[i].value) > -1) {
          elements[i].disabled = true;
        }
      }
    },
  };
})();
