(function(angular) {
  var module = angular.module('app.navigation', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/build', {controller: 'BuildCtrl', templateUrl: 'app/build.html'});
    $routeProvider.when('/dataLoader', {controller: 'DataLoaderCtrl', templateUrl: 'app/data-loader.html'});

    $routeProvider.when('/oai/:teamId', {controller: 'AnalyticsCtrl', templateUrl: 'app/analytics/offai.html'});
    $routeProvider.when('/gamePlan/:teamId', {controller: 'GamePlanCtrl', templateUrl: 'app/analytics/gameplan.html'});
    $routeProvider.when('/theme', {controller: 'ThemeCtrl', templateUrl: 'app/theme.html'});
    $routeProvider.when('/', {templateUrl: 'app/home.html'});
    $routeProvider.otherwise({redirectTo: '/'});
  });

  module.controller('NavigationCtrl', function($scope, NotifyService, RestService) {
    var rest = new RestService("Backpack");
  });

  module.run(function($rootScope, $location) {
    $rootScope.link = function(path) {
      $location.path(path);
    }
  });
}(angular));

