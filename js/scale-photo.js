'use strict';
(function () {
  // Константы
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var STEP_SCALE = 25;

  // Переменные
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValueInput = document.querySelector('.scale__control--value');

  var createScaleClick = function (scaleValue) {
    return function () {
      var currentScale = Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseInt(scaleValueInput.value, 10) + scaleValue));

      if (currentScale >= MIN_VALUE && currentScale <= MAX_VALUE) {
        scaleValueInput.value = currentScale + '%';
        window.utils.imgPreview.style.transform = 'scale(' + currentScale / 100 + ')';
      }
    };
  };

  var scalelBiggerClick = createScaleClick(STEP_SCALE);
  var scaleSmallerClick = createScaleClick(-STEP_SCALE);

  // Экспортированные значения
  window.popupScale = {
    activate: function () {
      scaleValueInput.value = MAX_VALUE + '%';
      window.utils.imgPreview.style.transform = 'scale(' + MAX_VALUE / 100 + ')';

      scaleBigger.addEventListener('click', scalelBiggerClick);
      scaleSmaller.addEventListener('click', scaleSmallerClick);
    },
    deactivate: function () {
      scaleBigger.removeEventListener('click', scalelBiggerClick);
      scaleSmaller.removeEventListener('click', scaleSmallerClick);
    }
  };
})();
