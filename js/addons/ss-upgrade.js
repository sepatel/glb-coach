(function(angular) {
  var module = angular.module("ssUpgrade", ['ssStorage']);

  module.service("UpgradeMonitor", ['$http', '$interval', '$rootScope', '$window', 'Storage',
    function($http, $interval, $rootScope, $window, Storage) {
      var version = +Storage.get('version') || 0;
      $rootScope.upgraded = Storage.remove("_upgraded") || false;
      $rootScope.version = version;

      var service = {
        pollServer: function(url, frequencyInSeconds, versionExtractFunction) {
          if (!angular.isFunction(versionExtractFunction)) {
            versionExtractFunction = function(input) {
              return input;
            }
          }

          function versionCheck() {
            $http.get(url, {params: {t: +new Date()}}).then(function(response) {
              var newVersion = versionExtractFunction(response.data);
              if (newVersion > version) {
                var broadcast = {oldVersion: version, newVersion: newVersion};
                version = newVersion;
                $rootScope.version = version;
                $rootScope.$broadcast('versionUpgrade', broadcast);
                service.upgrade();
              }
            });
          }

          versionCheck();
          $interval(versionCheck, 1000 * frequencyInSeconds);
        },
        upgrade: function() {
          angular.forEach(keysToRemove, function(key) {
            Storage.remove(key);
          });

          Storage.save('version', version);
          Storage.save('_upgraded', true);

          $window.location.reload();
        }
      };
      return service;
    }]);
}(angular));
