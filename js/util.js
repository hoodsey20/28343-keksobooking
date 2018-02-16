'use strict';

window.util = (function () {
  return {
    getRandomInInterval: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    compareWithRandomResult: function () {
      return Math.random() - 0.5;
    },
    getRightWorldForm: function (num, one, two, five) {
      var number = Math.abs(num);
      var remainderOfDivisionBy100 = number % 100;
      var remainderOfDivisionBy10 = number % 10;
      var noun = one;

      if (remainderOfDivisionBy100 > 4 && remainderOfDivisionBy100 < 20 || remainderOfDivisionBy10 === 0 || remainderOfDivisionBy10 >= 5) {
        noun = five;
      } else if (remainderOfDivisionBy10 > 1 && remainderOfDivisionBy10 < 5) {
        noun = two;
      }

      return noun;
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
