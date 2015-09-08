(function(angular) {
  var module = angular.module('util.rest', ['ssNotify']);

  module.factory("RestService", function($http, $q, NotifyService) {
    return function(section) {
      this.$delete = function(url, header) {
        return $http.delete(url, header).then(successHandler, errorHandler);
      };
      this.$get = function(url, header) {
        return $http.get(url, header).then(successHandler, errorHandler);
      };
      this.$post = function(url, data, header) {
        return $http.post(url, data, header).then(successHandler, errorHandler);
      };
      this.$put = function(url, data, header) {
        return $http.put(url, data, header).then(successHandler, errorHandler);
      };

      function errorHandler(response) {
        console.error("Error in RestService: %s", response.data, response);
        NotifyService.danger(section + " Error", response.data);
        return $q.reject(response.data);
      }

      function successHandler(result) {
        return result.data;
      }
    };
  });
}(angular));
