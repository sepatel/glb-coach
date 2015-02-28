(function(angular) {
  var VERSION_POLLING_FREQUENCY = 1000 * 60 * 15; // 15 minute checks for new release

  var module = angular.module('app.system', ['ssNotify', 'ssStorage']);

  module.service('System', function($rootScope, $http, $log, $window, NotifyService, Storage) {
    var release = new Date(Storage.get('version') || 0);
    var forcedRefresh = Storage.get('_upgraded') || false;
    if (forcedRefresh) {
      NotifyService.info("Application Update", "Updates have been made to the application as of " + release.toISOString(), 0);
      Storage.remove('_upgraded');
    }
    $rootScope.release = release;

    return {
      version: release,
      versionCheck: function() {
        $http.get("/version", {params: {t: +new Date()}}).then(function(response) {
          var newVersion = new Date(response.data.release) || new Date();
          if (newVersion > release) {
            var prevVersion = release;
            $rootScope.release = release = newVersion;
            $rootScope.$broadcast('versionUpgrade', { oldVersion: prevVersion, newVersion: newVersion });

            angular.forEach(+response.data.erase || [], function(key) {
              Storage.remove(key);
            });
            Storage.set('version', release);
            Storage.set('_upgraded', true);
            $window.location.reload();
          }
        });
      }
    };
  });

  module.run(function($interval, System) {
    System.versionCheck(); // check immediately
    $interval(System.versionCheck, VERSION_POLLING_FREQUENCY);
  });
}(angular));
