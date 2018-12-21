'use strict';
(function () {
  // Переменные
  var simularPicture = document.querySelector('.pictures');
  var picturesContainer = document.querySelector('main');

  // Функции
  var onLoad = function (pictures) {
    window.utils.generateElements(pictures, window.pictures.createPicture, simularPicture);
    var findPicture = function (evt) {
      if (evt.target.parentNode.className === 'picture') {
        for (var i = 0; i < pictures.length; i++) {
          if (pictures[i].url === evt.target.parentNode.id) {
            window.preview.fillBigPicture(pictures[i]);
          }
        }
      }
    };
    // Обработчик на маленькую фотографию для открытия большой
    simularPicture.addEventListener('click', function (evt) {
      findPicture(evt);
    });
  };

  window.data = {
    onError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: #ffffff';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = '20px';
      node.style.fontSize = '24px';

      node.textContent = errorMessage;
      picturesContainer.insertAdjacentElement('afterbegin', node);
    }
  };

  // Код программы
  window.backend.load(onLoad, window.data.onError);
})();
