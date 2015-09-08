(function(angular) {
  var module = angular.module('app.navigation', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/build', {controller: 'BuildCtrl', templateUrl: 'app/build/build.html'});
    $routeProvider.when('/oai/:teamId', {controller: 'AnalyticsCtrl', templateUrl: 'app/analytics/offai.html'});
    $routeProvider.when('/theme', {controller: 'ThemeCtrl', templateUrl: 'app/theme.html'});
    $routeProvider.when('/', {templateUrl: 'app/home.html'});
    $routeProvider.otherwise({redirectTo: '/'});
  });
}(angular));

