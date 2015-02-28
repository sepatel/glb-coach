(function(angular) {
  var module = angular.module("ssStorage", []);

  module.service("Storage", ['$document', '$window', function($document, $window) {
    var useLocalStorage = $window.localStorage ? true : false;

    var storage = {
      get: function(key) {
        var data = (useLocalStorage) ? $window.localStorage.getItem(key) : angular.fromJson($document.cookie[key]);
        return data ? angular.fromJson(data) : null;
      },
      set: function(key, value, expires) {
        if (value == null) {
          return storage.remove(key);
        }

        if (useLocalStorage) {
          $window.localStorage.setItem(key, angular.toJson(value));
        } else {
          $document.cookie = key + "=" + angular.toJson(value) + ";" + (expires ? ("expires=" + expires + ";") : '') + " path=/";
        }
        return value;
      },
      remove: function(key) {
        var removedItem = storage.get(key);
        if (useLocalStorage) {
          $window.localStorage.removeItem(key);
        } else {
          $document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
        return removedItem;
      }
    };
    return storage;
  }]);
}(angular));
