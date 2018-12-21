'use strict';
(function () {
  // Переменные
  var uploadPicture = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayClose = document.querySelector('.img-upload__cancel');
  var form = document.querySelector('#upload-select-image');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelRange = document.querySelector('.img-upload__effect-level');
  var textInput = document.querySelector('textarea[name=description]');

  var popupSuccessTemplate = document.querySelector('#success');
  var popupFailedTemplate = document.querySelector('#error');

  // Функции
  // Закрытие попапа при нажатии на пустую область вокруг него
  var isClickNotToElement = function (popupElement, closePopup) {
    return function (evt) {
      evt.stopPropagation();
      if (evt.target === popupElement) {
        closePopup(popupElement);
      }
    };
  };

  var uploadRealPicture = function () {
    var reader = new FileReader();
    var file = uploadPicture.files[0];
    reader.onloadend = function () {
      window.utils.picturePreviewImg.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      window.utils.picturePreviewImg.src = '';
    }
  };

  // Открытие/закрытия попапа редактирования фото
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    window.utils.bodyTag.classList.add('modal-open');
    window.scalePhoto.activate();
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    window.utils.bodyTag.classList.remove('modal-open');
    addEffect('none');
    form.reset();
    effectRangeHidden();
    window.scalePhoto.deactivate();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Удаление обработчика при фокусе
  var onInputFocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Добавление класса, соответсвующего эффекту
  var addEffect = function (effect) {
    window.utils.picturePreviewImg.classList.remove(window.utils.picturePreviewImg.classList.item(0));
    window.utils.picturePreviewImg.style.filter = '';
    window.utils.picturePreviewImg.classList.add('effects__preview--' + effect);
  };

  // Скрытие фильтра при выборе оригинального изображения
  var effectRangeHidden = function () {
    if (window.utils.picturePreviewImg.classList.contains('effects__preview--none')) {
      effectLevelRange.classList.add('hidden');
    } else {
      effectLevelRange.classList.remove('hidden');
    }
  };

  // Создание сообщения при успешной/неудачной отправке
  var createPopupMessage = function (popupTemplate) {
    return function () {
      closePopup();
      var popup = popupTemplate.content.firstElementChild.cloneNode(true);
      var popupButton = popup.querySelectorAll('button');

      var onPopupButtonClick = function () {
        deletePopup();
      };

      var deletePopup = function () {
        window.utils.bodyTag.removeChild(popup);
        popupButton.forEach(function (button) {
          button.removeEventListener('click', onPopupButtonClick);
        });
        document.removeEventListener('keydown', onPopupEscPressMessage);
        document.addEventListener('click', onNoPopupClick);
      };

      popupButton.forEach(function (button) {
        button.addEventListener('click', onPopupButtonClick);
      });

      var onNoPopupClick = isClickNotToElement(popup, deletePopup);

      var onPopupEscPressMessage = function (evt) {
        window.utils.isEscEvent(evt, onPopupButtonClick);
      };

      document.addEventListener('keydown', onPopupEscPressMessage);
      document.addEventListener('click', onNoPopupClick);
      window.utils.bodyTag.appendChild(popup);
    };
  };

  // Код программы
  // Обработчик отправки данных формы на сервер
  form.addEventListener('submit', function (evt) {
    window.backend.sendData(createPopupMessage(popupSuccessTemplate), createPopupMessage(popupFailedTemplate), new FormData(form));
    evt.preventDefault();
  });

  // Скрытие слайдера интенсивности эффектов
  effectLevelRange.classList.add('hidden');

  // Обработчик выбора эффекта
  effectsList.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      addEffect(evt.target.value);
      window.setPositionPin(100);
    }
    effectRangeHidden();
  });

  // Обработчик на текстовое поле
  textInput.addEventListener('focusin', onInputFocus);
  textInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  // Обработчики кнопки загрузки файла
  uploadPicture.addEventListener('change', function () {
    openPopup();
    uploadRealPicture();
  });

  uploadPicture.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  uploadOverlayClose.addEventListener('click', function () {
    closePopup();
  });

  uploadOverlayClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });
})();
