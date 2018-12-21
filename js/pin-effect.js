'use strict';
(function () {
  // Переменные
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  // Функции
  // Перемещение пина
  var scalePinMousedownHandler = function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var position = (effectLevelPin.offsetLeft - shift) * 100 / 453;
      window.setPositionPin(position);
      selectEffectsPreview();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // Генерация эффектов
  var selectEffectsPreview = function () {
    if (window.utils.imgPreviewImg.classList.contains('effects__preview--chrome')) {
      window.utils.imgPreviewImg.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
    } else if (window.utils.imgPreviewImg.classList.contains('effects__preview--sepia')) {
      window.utils.imgPreviewImg.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
    } else if (window.utils.imgPreviewImg.classList.contains('effects__preview--marvin')) {
      window.utils.imgPreviewImg.style.filter = 'invert(' + 100 * effectLevelValue.value / 100 + '%)';
    } else if (window.utils.imgPreviewImg.classList.contains('effects__preview--phobos')) {
      window.utils.imgPreviewImg.style.filter = 'blur(' + 3 * effectLevelValue.value / 100 + 'px)';
    } else if (window.utils.imgPreviewImg.classList.contains('effects__preview--heat')) {
      window.utils.imgPreviewImg.style.filter = 'brightness(' + ((2 * effectLevelValue.value / 100) + 1) + ')';
    } else {
      window.utils.imgPreviewImg.style.filter = '';
    }
  };

  // Обработчик на пин
  effectLevelPin.addEventListener('mousedown', scalePinMousedownHandler);

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
