'use strict';
(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Экспортированные значения
  window.utils = {
    bodyTag: document.querySelector('body'),
    picturePreviewImg: document.querySelector('.img-upload__preview').querySelector('img'),
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
    }
  };
})();
