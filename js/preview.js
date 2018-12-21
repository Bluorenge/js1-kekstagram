'use strict';
(function () {
  // Константы
  var COMMENTS_STEP = 5;

  // Переменные
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.comment-current-count');

  // Создание комментариев к фотографии
  var createComments = function (comments) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var comment = commentTemplate.cloneNode(true);

    var commentPicture = comment.querySelector('.social__picture');
    var commentMessage = comment.querySelector('.social__text');

    commentPicture.src = comments.avatar;
    commentMessage.textContent = comments.message;

    return comment;
  };

  // Экспортированные значения
  // Создание DOM-элемента большой фотографии на основе JS-объекта
  window.createBigPicture = function (picture) {
    var bigPictureImage = document.querySelector('.big-picture__img > img');
    var bigPictureLikes = document.querySelector('.likes-count');
    var bigPictureDescription = document.querySelector('.social__caption');
    var bigPictureCommentsCount = document.querySelector('.comments-count');

    bigPictureImage.src = picture.url;
    bigPictureLikes.textContent = picture.likes;
    bigPictureDescription.textContent = picture.description;
    bigPictureCommentsCount.textContent = picture.comments.length;

    var totalCommentsQuanity = picture.comments.length;
    var currentCommentsQuanity = 0;
    var onCommentsLoaderClick = function () {
      loadMoreComments();
    };

    var loadMoreComments = function () {
      var comment;
      var commentsNumber = Math.min(COMMENTS_STEP, totalCommentsQuanity - currentCommentsQuanity);

      for (var i = 0; i < commentsNumber; i++) {
        comment = createComments(picture.comments[i]);
        window.utils.commentsList.appendChild(comment);
      }
      currentCommentsQuanity += i;

      commentsCount.innerHTML = '';
      commentsCount.textContent = currentCommentsQuanity;

      if (currentCommentsQuanity >= totalCommentsQuanity) {
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        commentsLoader.classList.add('hidden');
      }

    };

    window.utils.commentsList.innerHTML = '';
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    commentsLoader.classList.remove('hidden');

    loadMoreComments();
  };
})();
