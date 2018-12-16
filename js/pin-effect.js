'use strict';
(function () {
  // Переменные
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayClose = document.querySelector('.img-upload__cancel');

  var imgPreview = document.querySelector('.img-upload__preview');
  var imgPreviewImg = imgPreview.querySelector('img');

  var effectsList = document.querySelector('.effects__list');

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var effectLevelRange = document.querySelector('.img-upload__effect-level');

  // Функции
  // Позиция пина
  var setPositionPin = function (currentPosition) {
    if (currentPosition > 100 || currentPosition < 0) {
      return;
    }
    effectLevelPin.style.left = currentPosition + '%';
    effectLevelDepth.style.width = currentPosition + '%';
    effectLevelValue.value = Math.round(currentPosition);
  };

  // Перемещение пина
  var scalePinMousedownHandler = function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var position = (effectLevelPin.offsetLeft - shift) * 100 / 453;
      setPositionPin(position);
      effectsPreview();
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
  var effectsPreview = function () {
    if (imgPreviewImg.classList.contains('effects__preview--chrome')) {
      imgPreviewImg.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
    } else if (imgPreviewImg.classList.contains('effects__preview--sepia')) {
      imgPreviewImg.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
    } else if (imgPreviewImg.classList.contains('effects__preview--marvin')) {
      imgPreviewImg.style.filter = 'invert(' + 100 * effectLevelValue.value / 100 + '%)';
    } else if (imgPreviewImg.classList.contains('effects__preview--phobos')) {
      imgPreviewImg.style.filter = 'blur(' + 3 * effectLevelValue.value / 100 + 'px)';
    } else if (imgPreviewImg.classList.contains('effects__preview--heat')) {
      imgPreviewImg.style.filter = 'brightness(' + ((2 * effectLevelValue.value / 100) + 1) + ')';
    } else {
      imgPreviewImg.style.filter = '';
    }
  };

  // Открытие/закрытия попапа редактирования фото
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Добавление класса, соответсвующего эффекту
  var addEffect = function (effect) {
    imgPreviewImg.classList.remove(imgPreviewImg.classList.item(0));
    imgPreviewImg.style.filter = '';
    imgPreviewImg.classList.add('effects__preview--' + effect);
  };

  // Код программы
  // Обработчик на пин
  effectLevelPin.addEventListener('mousedown', scalePinMousedownHandler);

  // Скрытие слайдера интенсивности эффектов
  effectLevelRange.classList.add('hidden');

  // Обработчик выбора эффекта
  effectsList.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      addEffect(evt.target.value);
      setPositionPin(100);
    }
    if (imgPreviewImg.classList.contains('effects__preview--none')) {
      effectLevelRange.classList.add('hidden');
    } else {
      effectLevelRange.classList.remove('hidden');
    }
  });

  // Обработчики кнопки загрузки файла
  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  uploadFile.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  uploadOverlayClose.addEventListener('click', function () {
    closePopup();
  });

  uploadOverlayClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });
})();
