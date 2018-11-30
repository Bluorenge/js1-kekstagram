'use strict';

// Переменные
var QUANTITY_PHOTOS = 25;
var QUANTITY_COMMENTS = 3;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var simularPicture = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

// Получение случайного числа
var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Получение случайного элемента массива
var getRandomElement = function (array) {
  var numGenerator = Math.round(Math.random() * (array.length - 1));

  return array[numGenerator];
};

// Генерация массива с последовательными числами
var generateRange = function (min, max, step) {
  var range = [];
  for (var i = min; i <= max; i += step) {
    range.push(i);
  }

  return range;
};

// Перемешивание элементов массива случайным образом
var randomizeArray = function (arr) {
  var arrLength = arr.length;
  var newArr = [];
  for (var i = 0; i < arrLength; i++) {
    var index = Math.floor(Math.random() * arr.length);
    newArr.push(arr[index]);
    arr.splice(index, 1);
  }

  return newArr;
};

// Создание массива с нужным количеством характеристик фотографий
var createArray = function () {
  var array = [];
  for (var i = 0; i < QUANTITY_PHOTOS; i++) {
    array[i] = {
      url: 'photos/' + randomUrlNumbers[i] + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: createArrayComment(QUANTITY_COMMENTS),
      description: getRandomElement(DESCRIPTION)
    };
  }

  return array;
};

// Создание массива с нужным количеством комментариев
var createArrayComment = function (quantity) {
  var array = [];
  for (var i = 0; i < quantity; i++) {
    array[i] = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomElement(COMMENTS),
      name: getRandomElement(FIRST_NAME)
    };
  }

  return array;
};

// Создание DOM-элемента на основе JS-объекта
var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  var pictureImg = pictureElement.querySelector('.picture__img');
  var pictureLikes = pictureElement.querySelector('.picture__likes');
  var pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureComments.textContent = picture.comments.length;

  return pictureElement;
};

// Создание DOM-элемента на основе JS-объекта
var fillBigPicture = function (picture) {
  var bigPictureImage = document.querySelector('.big-picture__img > img');
  var bigPictureAuthorImg = document.querySelector('.social__header > .social__picture');
  var bigPictureLikes = document.querySelector('.likes-count');
  var bigPictureDescription = document.querySelector('.social__caption');
  var bigPictureCommentsCount = document.querySelector('.comments-count');

  bigPictureImage.src = picture.url;
  bigPictureAuthorImg.src = picture.comments[0].avatar;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
  bigPictureCommentsCount.textContent = picture.comments.length;

  var commentsList = document.querySelector('.social__comments');
  generateElements(picture.comments, createComments, commentsList);
};

var createComments = function (comment) {
  var commentInList = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentElement = commentInList.cloneNode(true);

  var commentPicture = commentElement.querySelector('.social__picture');
  var commentMessage = commentElement.querySelector('.social__text');

  commentPicture.src = comment.avatar;
  commentMessage.textContent = comment.message;

  return commentElement;
};

// Заполнение блока DOM-элементами на основе массива JS-объектов
var generateElements = function (array, createElement, appendTo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createElement(array[i]));
  }
  appendTo.appendChild(fragment);
};

// Код программы
bigPicture.classList.remove('hidden');
socialCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
var urlNumbers = generateRange(1, 25, 1);
var randomUrlNumbers = randomizeArray(urlNumbers);
var picturesArray = createArray();
generateElements(picturesArray, createPicture, simularPicture);
fillBigPicture(picturesArray[0]);
