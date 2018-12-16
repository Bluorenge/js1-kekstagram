'use strict';
(function () {
  // Функции
  // Создание комментариев к фотографии
  var createComments = function (comment) {
    var commentInList = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentInList.cloneNode(true);

    var commentPicture = commentElement.querySelector('.social__picture');
    var commentMessage = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentMessage.textContent = comment.message;

    return commentElement;
  };

  window.preview = {
  // Создание DOM-элемента большой фотографии на основе JS-объекта
    fillBigPicture: function (picture) {
      var bigPictureImage = document.querySelector('.big-picture__img > img');
      var bigPictureAuthorImg = document.querySelector('.social__header > .social__picture');
      var bigPictureLikes = document.querySelector('.likes-count');
      var bigPictureDescription = document.querySelector('.social__caption');
      var bigPictureCommentsCount = document.querySelector('.comments-count');

      bigPictureImage.src = picture.url;
      bigPictureAuthorImg.src = picture.comments[1].avatar;
      bigPictureLikes.textContent = picture.likes;
      bigPictureDescription.textContent = picture.description;
      bigPictureCommentsCount.textContent = picture.comments.length;

      window.utils.generateElements(picture.comments, createComments, window.pictures.commentsList);
    }
  };
})();
