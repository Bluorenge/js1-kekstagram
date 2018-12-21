'use strict';
(function () {
  var COMMENTS_STEP = 5;
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.comment-current-count');

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
      var bigPictureLikes = document.querySelector('.likes-count');
      var bigPictureDescription = document.querySelector('.social__caption');
      var bigPictureCommentsCount = document.querySelector('.comments-count');

      bigPictureImage.src = picture.url;
      bigPictureLikes.textContent = picture.likes;
      bigPictureDescription.textContent = picture.description;
      bigPictureCommentsCount.textContent = picture.comments.length;

      var totalCommentsQuanity = picture.comments.length;
      var currentCommentsQuanity = 0;
      var commentsLoaderHandler = function () {
        loadMoreComments();
      };

      var loadMoreComments = function () {
        var commentElement;
        var commentsNumber = Math.min(COMMENTS_STEP, totalCommentsQuanity - currentCommentsQuanity);

        for (var i = 0; i < commentsNumber; i++) {
          commentElement = createComments(picture.comments[i]);
          window.utils.commentsList.appendChild(commentElement);
        }
        currentCommentsQuanity += i;

        commentsCount.innerHTML = '';
        commentsCount.textContent = currentCommentsQuanity;

        if (currentCommentsQuanity >= totalCommentsQuanity) {
          commentsLoader.removeEventListener('click', commentsLoaderHandler);
          commentsLoader.classList.add('hidden');
        }

      };

      window.utils.commentsList.innerHTML = '';
      commentsLoader.addEventListener('click', commentsLoaderHandler);
      commentsLoader.classList.remove('hidden');

      loadMoreComments();
    }
  };
})();
