'use strict';
(function () {
  // Переменные
  var simularPicture = document.querySelector('.pictures');

  // Функции
  var onLoad = function (pictures) {
    window.utils.generateElements(pictures, window.pictures.createPicture, simularPicture);
    var findPicture = function (evt) {
      if (evt.target.parentNode.className === 'picture') {
        for (var j = 0; j < pictures.length; j++) {
          if (pictures[j].url === evt.target.parentNode.id) {
            window.preview.fillBigPicture(pictures[j]);
          }
        }
      }
    };
    // Обработчик на маленькую фотографию для открытия большой
    simularPicture.addEventListener('click', function (evt) {
      findPicture(evt);
    });
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: #ffffff';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.bottom = '72px';
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    simularPicture.insertAdjacentElement('beforeend', node);
  };

  // Код программы
  window.backend.load(onLoad, onError);
})();
