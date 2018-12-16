'use strict';

// Константы
var QUANTITY_PHOTOS = 25;
var QUANTITY_COMMENTS = 3;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var simularPicture = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel');

var socialCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var commentsList = document.querySelector('.social__comments');

var uploadForm = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayClose = document.querySelector('.img-upload__cancel');

var imgPreview = document.querySelector('.img-upload__preview');
var imgPreviewImg = imgPreview.querySelector('img');

var effectsList = document.querySelector('.effects__list');

var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelValue = document.querySelector('.effect-level__value');

var effectLevelRange = document.querySelector('.img-upload__effect-level');

var hashtagsInput = document.querySelector('input[name=hashtags]');

// Функции
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

// Удаление потомков элемента
var removeAllChildren = function (element) {
  var childList = element.childNodes;
  for (var i = 0; i < childList.length; i++) {
    element.removeChild(childList[i]);
  }
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

// Проверка отсутствия повторов в массиве
var checkRepeats = function (arr) {
  var arrLowerCase = [];
  for (var i = 0; i < arr.length; i++) {
    arrLowerCase.push(arr[i].toLowerCase());
    var place = arrLowerCase.indexOf(arrLowerCase[i]);
    if (place !== i) {
      return false;
    }
  }
  return true;
};

// Проверка хештегов
var validateHashtags = function (input) {
  var hashtags = input.value;
  if (hashtags === '') {
    input.setCustomValidity('');
    return;
  }
  var hashtagsList = hashtags.split(' ');
  if (hashtagsList.length > 5) {
    input.setCustomValidity('Нельзя использовать больше 5 хэш-тегов');
  } else if (!checkRepeats(hashtagsList)) {
    input.setCustomValidity('Хэш-теги не должны повторяться. Хэш-теги нечувствительны к регистру. #ХэшТег и #хэштег, один и тот же тег');
  } else {
    for (var i = 0; i < hashtagsList.length; i++) {
      if (hashtagsList[i].charAt(0) !== '#') {
        input.setCustomValidity('Хэш-тег должен начинаться с символа решетки. На то он и хэш-тег');
      } else if (hashtagsList[i].substring(1).indexOf('#') !== -1) {
        input.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (hashtagsList[i].length < 2) {
        input.setCustomValidity('Хэш-тег не может быть короче 2 символов');
      } else if (hashtagsList[i].length > 20) {
        input.setCustomValidity('Хэш-тег не может быть длиннее 20 символов');
      } else {
        input.setCustomValidity('');
      }
    }
  }
  return;
};

// Позиция пина
var setPositionPin = function (currentPosition) {
  if (currentPosition > 100 || currentPosition < 0) {
    return;
  }
  effectLevelPin.style.left = currentPosition + '%';
  effectLevelDepth.style.width = currentPosition + '%';
  effectLevelValue.value = Math.round(currentPosition);
};

// Перемещение пина
var scalePinMousedownHandler = function (evt) {
  evt.preventDefault();
  var startCoordX = evt.clientX;

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoordX - moveEvt.clientX;
    startCoordX = moveEvt.clientX;

    var position = (effectLevelPin.offsetLeft - shift) * 100 / 453;
    setPositionPin(position);
    effectsPreview();
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

// Генерация эффектов
var effectsPreview = function () {
  if (imgPreviewImg.classList.contains('effects__preview--chrome')) {
    imgPreviewImg.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
  } else if (imgPreviewImg.classList.contains('effects__preview--sepia')) {
    imgPreviewImg.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
  } else if (imgPreviewImg.classList.contains('effects__preview--marvin')) {
    imgPreviewImg.style.filter = 'invert(' + 100 * effectLevelValue.value / 100 + '%)';
  } else if (imgPreviewImg.classList.contains('effects__preview--phobos')) {
    imgPreviewImg.style.filter = 'blur(' + 3 * effectLevelValue.value / 100 + 'px)';
  } else if (imgPreviewImg.classList.contains('effects__preview--heat')) {
    imgPreviewImg.style.filter = 'brightness(' + ((2 * effectLevelValue.value / 100) + 1) + ')';
  } else {
    imgPreviewImg.style.filter = '';
  }
};

// Добавление класса, соответсвующего эффекту
var addEffect = function (effect) {
  imgPreviewImg.classList.remove(imgPreviewImg.classList.item(0));
  imgPreviewImg.style.filter = '';
  imgPreviewImg.classList.add('effects__preview--' + effect);
};

// Поиск большой фотографии, соответствующей маленькой
var findPicture = function (evt) {
  if (evt.target.parentNode.className === 'picture') {
    for (var i = 0; i < picturesArray.length; i++) {
      if (picturesArray[i].id === evt.target.parentNode.id) {
        fillBigPicture(picturesArray[i]);
      }
    }
  }
};

// Открытие/закрытия попапа редактирования фото
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadOverlay.classList.add('hidden');
  uploadForm.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

// Открытие/закрытия попапа большого фото
var onPopupEscPressBigPicture = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopupBigPicture();
  }
};

var openPopupBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPressBigPicture);
};

var closePopupBigPicture = function () {
  bigPicture.classList.add('hidden');
  removeAllChildren(commentsList);
};

// Создание массива с нужным количеством характеристик фотографий
var createArray = function () {
  var array = [];
  for (var i = 0; i < QUANTITY_PHOTOS; i++) {
    array[i] = {
      id: 'picture-link-' + i,
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

// Создание DOM-элемента маленькой фотографии на основе JS-объекта
var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  var pictureImg = pictureElement.querySelector('.picture__img');
  var pictureLikes = pictureElement.querySelector('.picture__likes');
  var pictureComments = pictureElement.querySelector('.picture__comments');

  pictureElement.id = picture.id;
  pictureImg.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureComments.textContent = picture.comments.length;

  pictureElement.addEventListener('click', function () {
    openPopupBigPicture();
  });

  pictureElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopupBigPicture();
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    closePopupBigPicture();
  });

  return pictureElement;
};

// Создание DOM-элемента большой фотографии на основе JS-объекта
var fillBigPicture = function (picture) {
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

  generateElements(picture.comments, createComments, commentsList);
};

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

// Заполнение блока DOM-элементами на основе массива JS-объектов
var generateElements = function (array, createElement, appendTo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createElement(array[i]));
  }
  appendTo.appendChild(fragment);
};

// Код программы
socialCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
var urlNumbers = generateRange(1, 25, 1);
var randomUrlNumbers = randomizeArray(urlNumbers);
var picturesArray = createArray();
generateElements(picturesArray, createPicture, simularPicture);

// Обработчик на маленькую фотографию для открытия большой
simularPicture.addEventListener('click', function (evt) {
  findPicture(evt);
});

// Обработчик на пин
effectLevelPin.addEventListener('mousedown', scalePinMousedownHandler);

// Скрытие слайдера интенсивности эффектов
effectLevelRange.classList.add('hidden');

// Обработчик выбора эффекта
effectsList.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'INPUT') {
    addEffect(evt.target.value);
    setPositionPin(100);
  }
  if (imgPreviewImg.classList.contains('effects__preview--none')) {
    effectLevelRange.classList.add('hidden');
  } else {
    effectLevelRange.classList.remove('hidden');
  }
});

// Обработчики формы
uploadForm.addEventListener('change', function () {
  openPopup();
});

uploadForm.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

uploadOverlayClose.addEventListener('click', function () {
  closePopup();
});

uploadOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Обработчик
hashtagsInput.addEventListener('blur', function () {
  validateHashtags(hashtagsInput);
});
