'use strict';
(function () {
  // Константы
  var FILTER_LIMIT = 10;

  // Экспортированные значения
  window.picturesFilter = {
    // Создание массива с новыми фотографиями
    filterNewPictures: function (pictures) {
      var newPictures = pictures.slice();
      var resultPictures = [];
      for (var i = 0; i < FILTER_LIMIT; i++) {
        var index = Math.floor(Math.random() * newPictures.length);
        resultPictures.push(newPictures[index]);
        newPictures.splice(index, 1);
      }
      return resultPictures;
    },
    // Создание массива с сортировкой фотографий по количеству комментариев
    filterMostDiscussedPictures: function (pictures) {
      return pictures.slice().sort(function (firstPicture, secondPicture) {
        return secondPicture.comments.length - firstPicture.comments.length;
      });
    }
  };
})();
