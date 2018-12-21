'use strict';
(function () {
  // Переменные
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  // Функции
  // Удаление всех потомков элемента
  var removeAllChildren = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };
  // Открытие/закрытия попапа большого фото
  var onPopupEscPressBigPicture = function (evt) {
    window.utils.isEscEvent(evt, closePopupBigPicture);
  };

  var openPopupBigPicture = function () {
    bigPicture.classList.remove('hidden');
    window.utils.bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPressBigPicture);
  };

  var closePopupBigPicture = function () {
    removeAllChildren(window.utils.commentsList);
    window.utils.bodyTag.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  };

  // Экспортированные значения
  // Создание DOM-элемента маленькой фотографии на основе JS-объекта
  window.createPicture = function (pictures) {
    var picture = pictureTemplate.cloneNode(true);

    var pictureImg = picture.querySelector('.picture__img');
    var pictureLikes = picture.querySelector('.picture__likes');
    var pictureComments = picture.querySelector('.picture__comments');

    picture.id = pictures.url;
    pictureImg.src = pictures.url;
    pictureLikes.textContent = pictures.likes;
    pictureComments.textContent = pictures.comments.length;

    picture.addEventListener('click', function () {
      openPopupBigPicture();
    });

    picture.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, openPopupBigPicture);
    });

    bigPictureCancel.addEventListener('click', function () {
      closePopupBigPicture();
    });

    return picture;
  };
})();
