'use strict';
(function () {
  // Переменные
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayClose = document.querySelector('.img-upload__cancel');
  var form = document.querySelector('#upload-select-image');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelRange = document.querySelector('.img-upload__effect-level');
  var textInput = document.querySelector('textarea[name=description]');

  var popupSuccessTemplate = document.querySelector('#success');
  var popupFailedTemplate = document.querySelector('#error');

  // Функции
  // Открытие/закрытия попапа редактирования фото
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    window.utils.bodyTag.classList.add('modal-open');
    window.popupScale.activate();
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    window.utils.bodyTag.classList.remove('modal-open');
    addEffect('none');
    form.reset();
    effectRangeHidden();
    window.popupScale.deactivate();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Удаление обработчика при фокусе
  var inputFocusInHandler = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Добавление класса, соответсвующего эффекту
  var addEffect = function (effect) {
    window.utils.imgPreviewImg.classList.remove(window.utils.imgPreviewImg.classList.item(0));
    window.utils.imgPreviewImg.style.filter = '';
    window.utils.imgPreviewImg.classList.add('effects__preview--' + effect);
  };

  // Скрытие фильтра при выборе оригинального изображения
  var effectRangeHidden = function () {
    if (window.utils.imgPreviewImg.classList.contains('effects__preview--none')) {
      effectLevelRange.classList.add('hidden');
    } else {
      effectLevelRange.classList.remove('hidden');
    }
  };

  // Создание сообщения при успешной/неудачной отправке
  var createPopupMessage = function (popupElementTemplate) {
    return function () {
      closePopup();
      var popupElement = popupElementTemplate.content.firstElementChild.cloneNode(true);
      var popupButtonElements = popupElement.querySelectorAll('button');

      var popupButtonClickHandler = function () {
        deletePopup();
      };

      var deletePopup = function () {
        window.utils.bodyTag.removeChild(popupElement);
        popupButtonElements.forEach(function (buttonElement) {
          buttonElement.removeEventListener('click', popupButtonClickHandler);
        });
        document.removeEventListener('keydown', onPopupEscPressMessage);
        document.addEventListener('click', clickNotToPopup);
      };

      popupButtonElements.forEach(function (buttonElement) {
        buttonElement.addEventListener('click', popupButtonClickHandler);
      });

      var clickNotToPopup = window.utils.isClickNotToElement(popupElement, deletePopup);

      var onPopupEscPressMessage = function (evt) {
        window.utils.isEscEvent(evt, popupButtonClickHandler);
      };

      document.addEventListener('keydown', onPopupEscPressMessage);
      document.addEventListener('click', clickNotToPopup);
      window.utils.bodyTag.appendChild(popupElement);
    };
  };

  // Код программы
  // Обработчик отправки данных формы на сервер
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), createPopupMessage(popupSuccessTemplate), createPopupMessage(popupFailedTemplate));
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
  textInput.addEventListener('focusin', inputFocusInHandler);
  textInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
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
