'use strict';
// Получение и отправка данных на сервер
(function () {
  var LOAD_DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var SEND_DATA_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_TIME = 20000; // 20s
  var STATUS_OK = 200;

  var createRequest = function (url, method) {
    return function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_TIME;

      xhr.open(method, url);
      xhr.send(data);
    };
  };

  // Экспортированные значения
  window.backend = {
    loadData: createRequest(LOAD_DATA_URL, 'GET'),
    sendData: createRequest(SEND_DATA_URL, 'POST')
  };
})();
