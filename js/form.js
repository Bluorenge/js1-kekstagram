'use strict';
(function () {
  // Переменные
  var hashtagsInput = document.querySelector('input[name=hashtags]');

  // Функции
  // Проверка хештегов
  var validateHashtags = function (input) {
    var hashtags = input.value;
    if (hashtags === '') {
      input.setCustomValidity('');
      return;
    }
    var hashtagsList = hashtags.split(' ');
    if (hashtagsList.length > 5) {
      input.setCustomValidity('Нельзя использовать больше 5 хэш-тегов');
    } else if (!window.utils.checkRepeats(hashtagsList)) {
      input.setCustomValidity('Хэш-теги не должны повторяться. Хэш-теги нечувствительны к регистру. #ХэшТег и #хэштег, один и тот же тег');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if (hashtagsList[i].charAt(0) !== '#') {
          input.setCustomValidity('Хэш-тег должен начинаться с символа решетки. На то он и хэш-тег');
        } else if (hashtagsList[i].substring(1).indexOf('#') !== -1) {
          input.setCustomValidity('Хэш-теги должны разделяться пробелами');
        } else if (hashtagsList[i].length < 2) {
          input.setCustomValidity('Хэш-тег не может быть короче 2 символов');
        } else if (hashtagsList[i].length > 20) {
          input.setCustomValidity('Хэш-тег не может быть длиннее 20 символов');
        } else {
          input.setCustomValidity('');
        }
      }
    }
    return;
  };

  // Обработчик хэш-тегов
  hashtagsInput.addEventListener('blur', function () {
    validateHashtags(hashtagsInput);
  });
})();
