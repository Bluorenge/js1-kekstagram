'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    // Нажатие на Esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    // Нажатие на Enter
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    // Удаление всех потомков элемента
    removeAllChildren: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    // Получение случайного числа
    getRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);

      return rand;
    },
    // Получение случайного элемента массива
    getRandomElement: function (array) {
      var numGenerator = Math.round(Math.random() * (array.length - 1));

      return array[numGenerator];
    },
    // Генерация массива с последовательными числами
    generateRange: function (min, max, step) {
      var range = [];
      for (var i = min; i <= max; i += step) {
        range.push(i);
      }

      return range;
    },
    // Перемешивание элементов массива случайным образом
    randomizeArray: function (arr) {
      var arrLength = arr.length;
      var newArr = [];
      for (var i = 0; i < arrLength; i++) {
        var index = Math.floor(Math.random() * arr.length);
        newArr.push(arr[index]);
        arr.splice(index, 1);
      }

      return newArr;
    },
    // Проверка отсутствия повторов в массиве
    checkRepeats: function (arr) {
      var arrLowerCase = [];
      for (var i = 0; i < arr.length; i++) {
        arrLowerCase.push(arr[i].toLowerCase());
        var place = arrLowerCase.indexOf(arrLowerCase[i]);
        if (place !== i) {
          return false;
        }
      }
      return true;
    },
    // Заполнение блока DOM-элементами на основе массива JS-объектов
    generateElements: function (array, createElement, appendTo) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(createElement(array[i]));
      }
      appendTo.appendChild(fragment);
    }
  };
})();
