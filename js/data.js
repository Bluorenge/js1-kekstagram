'use strict';
(function () {
  // Константы
  var FILTER_NEW = 'new';
  var FILTER_DISCUSSED = 'discussed';

  // Переменные
  var simularPicture = document.querySelector('.pictures');
  var filterImg = document.querySelector('.img-filters');
  var filterPicturesButtons = filterImg.querySelectorAll('.img-filters__button');
  var pageMain = document.querySelector('main');
  var cachedPictures = [];

  // Функции
  // Скрытие подсветки кнопки фильтра
  var hideActiveFilterButton = function (button) {
    button.classList.remove('img-filters__button--active');
  };

  var clearActiveClassFiltersButton = function () {
    filterPicturesButtons.forEach(function (buttonElement) {
      hideActiveFilterButton(buttonElement);
    });
  };

  // Отображение подсветки кнопки фильтра
  var createActiveClassFilterButton = function (button) {
    button.classList.add('img-filters__button--active');
  };

  // Удаление всех фотографий со странице
  var clearPictures = function () {
    var renderedPictures = simularPicture.querySelectorAll('.picture');
    renderedPictures.forEach(function (pictures) {
      simularPicture.removeChild(pictures);
    });
  };

  // Фильтр фотографий
  var filterButtonClickHandler = function (evt) {
    var activeFilterButton = evt.target;

    clearActiveClassFiltersButton();
    createActiveClassFilterButton(activeFilterButton);
    clearPictures();

    var filterAttributeId = activeFilterButton.getAttribute('id');
    var filterName = filterAttributeId.split('-')[1];

    switch (filterName) {
      case FILTER_NEW:
        return window.utils.generateElements(window.picturesFilter.filterNewPictures(cachedPictures), window.createPicture, simularPicture);
      case FILTER_DISCUSSED:
        return window.utils.generateElements(window.picturesFilter.filterMostDiscussedPictures(cachedPictures), window.createPicture, simularPicture);
      default:
        return window.utils.generateElements(cachedPictures, window.createPicture, simularPicture);
    }
  };

  var onLoad = function (pictures) {
    // Создание копии массива
    cachedPictures = pictures.slice();

    // Отображении информации из массива на странице
    window.utils.generateElements(pictures, window.createPicture, simularPicture);

    // Обработчики на кнопки фильтров
    filterPicturesButtons.forEach(function (buttonElement) {
      buttonElement.addEventListener('click', window.debounce(filterButtonClickHandler));
    });

    // Поиск большой фотографии, соответствующей маленькой
    var findPicture = function (evt) {
      if (evt.target.parentNode.className === 'picture') {
        for (var i = 0; i < pictures.length; i++) {
          if (pictures[i].url === evt.target.parentNode.id) {
            window.createBigPicture(pictures[i]);
          }
        }
      }
    };

    // Обработчик на маленькую фотографию для открытия большой
    simularPicture.addEventListener('click', function (evt) {
      findPicture(evt);
    });

    // Отображение фильтров фотографий
    filterImg.classList.remove('img-filters--inactive');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: #ffffff';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '20px';
    node.style.fontSize = '24px';

    node.textContent = errorMessage;
    pageMain.insertAdjacentElement('afterbegin', node);
  };

  // Код программы
  window.backend.load(onLoad, onError);
})();
