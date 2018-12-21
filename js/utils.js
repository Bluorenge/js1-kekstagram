'use strict';
(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Переменные
  var imgPreview = document.querySelector('.img-upload__preview');

  // Экспортированные значения
  window.utils = {
    bodyTag: document.querySelector('body'),
    imgPreview: document.querySelector('.img-upload__preview'),
    imgPreviewImg: imgPreview.querySelector('img'),
    commentsList: document.querySelector('.social__comments'),
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
    isClickNotToElement: function (popupElement, closePopup) {
      return function (evt) {
        evt.stopPropagation();
        if (evt.target === popupElement) {
          closePopup(popupElement);
        }
      };
    },
    // Удаление всех потомков элемента
    removeAllChildren: function (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    // Проверка отсутствия повторов в массиве
    checkRepeats: function (array) {
      var arrLowerCase = [];
      for (var i = 0; i < array.length; i++) {
        arrLowerCase.push(array[i].toLowerCase());
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
