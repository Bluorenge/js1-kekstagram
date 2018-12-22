'use strict';
(function () {
  // Константы
  var HASHTAGS_MAX_QUANITY = 5;
  var HASHTAG_LENGTH_MIN = 2;
  var HASHTAG_LENGTH_MAX = 20;

  // Переменные
  var hashtagsInput = document.querySelector('input[name=hashtags]');
  var errorInputBorder = 'border: 5px solid red;';

  // Функции
  // Проверка отсутствия повторов в массиве
  var checkRepeats = function (array) {
    var arrLowerCase = [];
    for (var i = 0; i < array.length; i++) {
      arrLowerCase.push(array[i].toLowerCase());
      var place = arrLowerCase.indexOf(arrLowerCase[i]);
      if (place !== i) {
        return false;
      }
    }
    return true;
  };

  // Проверка хештегов
  var validateHashtags = function (input) {
    var hashtags = input.value;
    if (hashtags === '') {
      input.setCustomValidity('');
      return;
    }
    var hashtagsList = hashtags.split(' ');
    if (hashtagsList.length > HASHTAGS_MAX_QUANITY) {
      input.style = errorInputBorder;
      input.setCustomValidity('Нельзя использовать больше 5 хэш-тегов');
    } else if (!checkRepeats(hashtagsList)) {
      input.style = errorInputBorder;
      input.setCustomValidity('Хэш-теги не должны повторяться. Хэш-теги нечувствительны к регистру. #ХэшТег и #хэштег, один и тот же тег');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if (hashtagsList[i].charAt(0) !== '#') {
          input.style = errorInputBorder;
          input.setCustomValidity('Хэш-тег должен начинаться с символа решетки. На то он и хэш-тег');
        } else if (hashtagsList[i].substring(1).indexOf('#') !== -1) {
          input.style = errorInputBorder;
          input.setCustomValidity('Хэш-теги должны разделяться пробелами');
        } else if (hashtagsList[i].length < HASHTAG_LENGTH_MIN) {
          input.style = errorInputBorder;
          input.setCustomValidity('Хэш-тег не может быть короче 2 символов');
        } else if (hashtagsList[i].length > HASHTAG_LENGTH_MAX) {
          input.style = errorInputBorder;
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
