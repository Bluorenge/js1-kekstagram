'use strict';
(function () {
  // Переменные
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  // Функции
  // Открытие/закрытия попапа большого фото
  var onPopupEscPressBigPicture = function (evt) {
    window.utils.isEscEvent(evt, closePopupBigPicture);
  };

  var openPopupBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPressBigPicture);
  };

  var closePopupBigPicture = function () {
    bigPicture.classList.add('hidden');
    window.utils.removeAllChildren(window.pictures.commentsList);
  };

  window.pictures = {
    // Создание DOM-элемента маленькой фотографии на основе JS-объекта
    createPicture: function (picture) {
      var pictureElement = pictureTemplate.cloneNode(true);

      var pictureImg = pictureElement.querySelector('.picture__img');
      var pictureLikes = pictureElement.querySelector('.picture__likes');
      var pictureComments = pictureElement.querySelector('.picture__comments');

      pictureElement.id = picture.id;
      pictureImg.src = picture.url;
      pictureLikes.textContent = picture.likes;
      pictureComments.textContent = picture.comments.length;

      pictureElement.addEventListener('click', function () {
        openPopupBigPicture();
      });

      pictureElement.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, openPopupBigPicture);
      });

      bigPictureCancel.addEventListener('click', function () {
        closePopupBigPicture();
      });

      return pictureElement;
    },
    commentsList: document.querySelector('.social__comments')
  };
})();
