'use strict';
(function () {
  // Переменные
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  // Функции
  // Перемещение пина
  var onPinMousedown = function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var position = (effectLevelPin.offsetLeft - shift) * 100 / 453;
      window.setPositionPin(position);
      selectEffectsPreview();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Генерация эффектов
  var selectEffectsPreview = function () {
    if (window.utils.picturePreviewImg.classList.contains('effects__preview--chrome')) {
      window.utils.picturePreviewImg.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
    } else if (window.utils.picturePreviewImg.classList.contains('effects__preview--sepia')) {
      window.utils.picturePreviewImg.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
    } else if (window.utils.picturePreviewImg.classList.contains('effects__preview--marvin')) {
      window.utils.picturePreviewImg.style.filter = 'invert(' + 100 * effectLevelValue.value / 100 + '%)';
    } else if (window.utils.picturePreviewImg.classList.contains('effects__preview--phobos')) {
      window.utils.picturePreviewImg.style.filter = 'blur(' + 3 * effectLevelValue.value / 100 + 'px)';
    } else if (window.utils.picturePreviewImg.classList.contains('effects__preview--heat')) {
      window.utils.picturePreviewImg.style.filter = 'brightness(' + ((2 * effectLevelValue.value / 100) + 1) + ')';
    } else {
      window.utils.picturePreviewImg.style.filter = '';
    }
  };

  // Обработчик на пин
  effectLevelPin.addEventListener('mousedown', onPinMousedown);

  // Экспортированные значения
  // Позиция пина
  window.setPositionPin = function (currentPosition) {
    if (currentPosition > 100 || currentPosition < 0) {
      return;
    }
    effectLevelPin.style.left = currentPosition + '%';
    effectLevelDepth.style.width = currentPosition + '%';
    effectLevelValue.value = Math.round(currentPosition);
  };
})();
