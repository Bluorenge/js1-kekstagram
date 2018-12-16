'use strict';
(function () {
  // Константы
  var QUANTITY_PHOTOS = 25;
  var QUANTITY_COMMENTS = 3;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  // Переменные
  var socialCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var simularPicture = document.querySelector('.pictures');

  // Функции
  // Создание массива с нужным количеством комментариев
  var createArrayComment = function (quantity) {
    var array = [];
    for (var i = 0; i < quantity; i++) {
      array[i] = {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
        message: window.utils.getRandomElement(COMMENTS),
        name: window.utils.getRandomElement(FIRST_NAME)
      };
    }

    return array;
  };

  // Создание массива с нужным количеством характеристик фотографий
  var createArray = function () {
    var array = [];
    for (var i = 0; i < QUANTITY_PHOTOS; i++) {
      array[i] = {
        id: 'picture-link-' + i,
        url: 'photos/' + randomUrlNumbers[i] + '.jpg',
        likes: window.utils.getRandomNumber(15, 200),
        comments: createArrayComment(QUANTITY_COMMENTS),
        description: window.utils.getRandomElement(DESCRIPTION)
      };
    }

    return array;
  };

  // Поиск большой фотографии, соответствующей маленькой
  var findPicture = function (evt) {
    if (evt.target.parentNode.className === 'picture') {
      for (var i = 0; i < picturesArray.length; i++) {
        if (picturesArray[i].id === evt.target.parentNode.id) {
          window.preview.fillBigPicture(picturesArray[i]);
        }
      }
    }
  };

  // Код программы
  // Скрытие количества комментариев
  socialCount.classList.add('visually-hidden');

  // Скрытие кнопки загрузки новой порции комментариев
  commentsLoader.classList.add('visually-hidden');

  // Генерация массива с 25-ю числами
  var urlNumbers = window.utils.generateRange(1, 25, 1);

  // Перемешивание созданного массива с 25-ю числами случайным образом
  var randomUrlNumbers = window.utils.randomizeArray(urlNumbers);

  // Запись созданного массива в переменную
  var picturesArray = createArray();

  // Заполнение блока DOM-элементами на основе массива фотографий JS-объектов
  window.utils.generateElements(picturesArray, window.pictures.createPicture, simularPicture);

  // Обработчик на маленькую фотографию для открытия большой
  simularPicture.addEventListener('click', function (evt) {
    findPicture(evt);
  });
})();
