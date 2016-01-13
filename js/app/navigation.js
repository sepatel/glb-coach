(function(angular) {
  var module = angular.module('app.navigation', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider.when('/build', {controller: 'BuildCtrl', templateUrl: 'app/build/build.html'});
    $routeProvider.when('/oai/:teamId', {controller: 'AnalyticsCtrl', templateUrl: 'app/analytics/offai.html'});
    $routeProvider.when('/gameplan/:teamId', {controller: 'GamePlanCtrl', templateUrl: 'app/analytics/gameplan.html'});
    $routeProvider.when('/theme', {controller: 'ThemeCtrl', templateUrl: 'app/theme.html'});
    $routeProvider.when('/', {templateUrl: 'app/home.html'});
    $routeProvider.otherwise({redirectTo: '/'});
  });

  module.controller('NavigationCtrl', function($scope, NotifyService, RestService) {
    var rest = new RestService("Backpack");

    $scope.loadTeam = function(teamId) {
      rest.$get('/api/team/' + teamId).then(function(team) {
        NotifyService.info("Team " + team._id, "<strong>" + team.name + "</strong> was successfully loaded");
      });
    };

    $scope.loadGame = function(gameId) {
      rest.$get('/api/game/' + gameId).then(function(game) {
        NotifyService.info("Game " + game._id, game.team.away.$id + " vs. " + game.team.home.$id + " was successfully loaded");
      });
    };
  });
}(angular));

